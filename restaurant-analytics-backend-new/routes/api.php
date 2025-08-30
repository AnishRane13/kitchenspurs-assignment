<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AnalyticsController;

Route::prefix('v1')->group(function () {
    Route::get('/restaurants', [AnalyticsController::class, 'restaurants']);
    Route::get('/restaurants/{restaurantId}/order-trends', [AnalyticsController::class, 'orderTrends']);
    Route::get('/top-restaurants', [AnalyticsController::class, 'topRestaurants']);
    Route::get('/filtered-orders', [AnalyticsController::class, 'filteredOrders']);
});
