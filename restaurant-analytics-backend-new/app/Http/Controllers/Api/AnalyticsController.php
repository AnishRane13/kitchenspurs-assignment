<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Carbon\Carbon;

class AnalyticsController extends Controller
{
    private $restaurantsData;
    private $ordersData;

    public function __construct()
    {
        $this->loadData();
    }

    private function loadData()
    {
        // Load restaurants data
        $restaurantsPath = storage_path('app/data/restaurants.json');
        if (file_exists($restaurantsPath)) {
            $this->restaurantsData = json_decode(file_get_contents($restaurantsPath), true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                \Log::error('Failed to parse restaurants.json: ' . json_last_error_msg());
                $this->restaurantsData = [];
            }
        } else {
            \Log::error('Restaurants data file not found at: ' . $restaurantsPath);
            $this->restaurantsData = [];
        }

        // Load orders data
        $ordersPath = storage_path('app/data/orders.json');
        if (file_exists($ordersPath)) {
            $this->ordersData = json_decode(file_get_contents($ordersPath), true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                \Log::error('Failed to parse orders.json: ' . json_last_error_msg());
                $this->ordersData = [];
            }
        } else {
            \Log::error('Orders data file not found at: ' . $ordersPath);
            $this->ordersData = [];
        }
    }

    public function restaurants(Request $request)
    {
        $restaurants = collect($this->restaurantsData);

        // Search functionality
        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $restaurants = $restaurants->filter(function($restaurant) use ($search) {
                return stripos($restaurant['name'], $search) !== false ||
                       stripos($restaurant['location'], $search) !== false ||
                       stripos($restaurant['cuisine'], $search) !== false;
            });
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'name');
        $sortOrder = $request->get('sort_order', 'asc');
        
        $restaurants = $restaurants->sortBy($sortBy);
        if ($sortOrder === 'desc') {
            $restaurants = $restaurants->reverse();
        }

        // Pagination
        $perPage = 10;
        $page = $request->get('page', 1);
        $offset = ($page - 1) * $perPage;
        
        $paginatedData = $restaurants->slice($offset, $perPage)->values();
        $total = $restaurants->count();

        return response()->json([
            'data' => $paginatedData,
            'current_page' => $page,
            'per_page' => $perPage,
            'total' => $total,
            'last_page' => ceil($total / $perPage)
        ]);
    }

    public function orderTrends(Request $request, $restaurantId)
    {
        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date'
        ]);

        $startDate = Carbon::parse($request->start_date);
        $endDate = Carbon::parse($request->end_date);

        // Filter orders for the specific restaurant and date range
        $filteredOrders = collect($this->ordersData)->filter(function ($order) use ($restaurantId, $startDate, $endDate) {
            $orderDate = Carbon::parse($order['order_time']);
            return $order['restaurant_id'] == $restaurantId && 
                   $orderDate->between($startDate, $endDate);
        });

        $dailyData = [];
        $currentDate = $startDate->copy();

        while ($currentDate <= $endDate) {
            $dateStr = $currentDate->format('Y-m-d');
            $dayOrders = $filteredOrders->filter(function ($order) use ($currentDate) {
                return Carbon::parse($order['order_time'])->format('Y-m-d') === $currentDate->format('Y-m-d');
            });

            $dailyData[] = [
                'date' => $dateStr,
                'orders_count' => $dayOrders->count(),
                'revenue' => $dayOrders->sum('order_amount'),
                'average_order_value' => $dayOrders->count() > 0 ? round($dayOrders->avg('order_amount'), 2) : 0,
                'peak_hour' => $this->getPeakHour($dayOrders)
            ];

            $currentDate->addDay();
        }

        return response()->json([
            'restaurant_id' => $restaurantId,
            'start_date' => $startDate->format('Y-m-d'),
            'end_date' => $endDate->format('Y-m-d'),
            'daily_data' => $dailyData
        ]);
    }

    public function topRestaurants(Request $request)
    {
        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date'
        ]);

        $startDate = Carbon::parse($request->start_date);
        $endDate = Carbon::parse($request->end_date);

        // Filter orders by date range
        $filteredOrders = collect($this->ordersData)->filter(function ($order) use ($startDate, $endDate) {
            $orderDate = Carbon::parse($order['order_time']);
            return $orderDate->between($startDate, $endDate);
        });

        // Group orders by restaurant and calculate metrics
        $restaurantStats = $filteredOrders->groupBy('restaurant_id')->map(function ($orders, $restaurantId) {
            $restaurant = collect($this->restaurantsData)->firstWhere('id', $restaurantId);
            
            return [
                'id' => $restaurantId,
                'name' => $restaurant['name'] ?? 'Unknown Restaurant',
                'location' => $restaurant['location'] ?? 'Unknown Location',
                'cuisine' => $restaurant['cuisine'] ?? 'Unknown Cuisine',
                'total_orders' => $orders->count(),
                'total_revenue' => $orders->sum('order_amount'),
                'average_order_value' => round($orders->avg('order_amount'), 2)
            ];
        })->values();

        // Sort by revenue and take top 3
        $topRestaurants = $restaurantStats->sortByDesc('total_revenue')->take(3)->values();

        return response()->json($topRestaurants);
    }

    public function filteredOrders(Request $request)
    {
        $query = collect($this->ordersData);

        // Restaurant filter
        if ($request->has('restaurant_id')) {
            $query = $query->where('restaurant_id', $request->restaurant_id);
        }

        // Date range filter
        if ($request->has('start_date')) {
            $startDate = Carbon::parse($request->start_date);
            $query = $query->filter(function ($order) use ($startDate) {
                return Carbon::parse($order['order_time'])->gte($startDate);
            });
        }
        
        if ($request->has('end_date')) {
            $endDate = Carbon::parse($request->end_date);
            $query = $query->filter(function ($order) use ($endDate) {
                return Carbon::parse($order['order_time'])->lte($endDate);
            });
        }

        // Amount range filter
        if ($request->has('min_amount')) {
            $query = $query->where('order_amount', '>=', $request->min_amount);
        }
        if ($request->has('max_amount')) {
            $query = $query->where('order_amount', '<=', $request->max_amount);
        }

        // Hour range filter
        if ($request->has('start_hour') || $request->has('end_hour')) {
            $startHour = $request->get('start_hour', 0);
            $endHour = $request->get('end_hour', 23);
            $query = $query->filter(function ($order) use ($startHour, $endHour) {
                $hour = Carbon::parse($order['order_time'])->hour;
                return $hour >= $startHour && $hour <= $endHour;
            });
        }

        // Sort by order time (newest first)
        $query = $query->sortByDesc('order_time');

        // Pagination
        $perPage = 20;
        $page = $request->get('page', 1);
        $offset = ($page - 1) * $perPage;
        
        $paginatedData = $query->slice($offset, $perPage)->values();
        $total = $query->count();

        // Add restaurant information to each order
        $paginatedData = $paginatedData->map(function ($order) {
            $restaurant = collect($this->restaurantsData)->firstWhere('id', $order['restaurant_id']);
            $order['restaurant'] = $restaurant;
            return $order;
        });

        return response()->json([
            'data' => $paginatedData,
            'current_page' => $page,
            'per_page' => $perPage,
            'total' => $total,
            'last_page' => ceil($total / $perPage)
        ]);
    }

    private function getPeakHour($orders)
    {
        if ($orders->isEmpty()) {
            return null;
        }

        $hourCounts = $orders->groupBy(function ($order) {
            return Carbon::parse($order['order_time'])->hour;
        })->map->count();

        return $hourCounts->sortDesc()->keys()->first();
    }
}
