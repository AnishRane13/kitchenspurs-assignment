# 🍽️ Restaurant Analytics Dashboard - Frontend

A modern, beautiful, and responsive React-based dashboard for restaurant analytics with enhanced UI/UX design.

## ✨ Features

### 🎨 **Modern Design System**
- **Gradient Backgrounds**: Beautiful gradient backgrounds with subtle animations
- **Glass Morphism**: Modern glass-like effects with backdrop blur
- **Rounded Corners**: Consistent 3xl border radius for modern aesthetics
- **Shadow System**: Subtle shadows with hover effects and transitions

### 🚀 **Enhanced User Experience**
- **Smooth Animations**: CSS transitions and hover effects throughout
- **Loading States**: Beautiful loading spinners with skeleton screens
- **Empty States**: Elegant empty state components with helpful messaging
- **Responsive Design**: Mobile-first approach with breakpoint optimization

### 📊 **Advanced Chart Components**
- **Recharts Integration**: Professional data visualization with custom styling
- **Gradient Charts**: Beautiful gradient fills for bars and areas
- **Enhanced Tooltips**: Custom styled tooltips with backdrop blur
- **Responsive Charts**: Charts that adapt to different screen sizes

### 🧩 **Reusable Components**
- **StatsCard**: Beautiful metric cards with trend indicators
- **ChartContainer**: Consistent chart wrapper with headers and styling
- **LoadingSpinner**: Animated loading component with multiple variants
- **EmptyState**: Elegant empty state handling

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Composable charting library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **date-fns** - Date utility library

## 🎯 **UI Components**

### Header Component
- **Gradient Background**: Blue to purple gradient with subtle patterns
- **Logo & Branding**: Restaurant analytics branding with icon
- **Navigation**: Clean navigation menu with hover effects
- **Wave Decoration**: SVG wave pattern at the bottom

### Dashboard
- **Welcome Section**: Hero section with descriptive text
- **Stats Cards**: 4-column grid of key metrics with icons
- **Top Restaurants Chart**: Bar chart with gradient fills
- **Restaurant Directory**: Enhanced table with search and sort

### Restaurant Details
- **Restaurant Header**: Large header with avatar and info
- **Key Metrics**: Quick stats with trend indicators
- **Date Range Selector**: Enhanced date picker with styling
- **Analytics Charts**: 4 different chart types in grid layout
- **Advanced Filters**: Form controls for order filtering
- **Orders Table**: Enhanced table with better visual hierarchy

## 🎨 **Design Principles**

### Color Palette
- **Primary**: Blue (#3B82F6) to Indigo (#6366F1)
- **Success**: Green (#10B981) to Emerald (#059669)
- **Warning**: Yellow (#F59E0B) to Amber (#D97706)
- **Danger**: Red (#EF4444) to Rose (#E11D48)
- **Neutral**: Gray (#6B7280) to Slate (#475569)

### Typography
- **Headings**: Bold, large text with proper hierarchy
- **Body**: Clean, readable text with appropriate sizing
- **Labels**: Medium weight for form elements
- **Captions**: Smaller text for secondary information

### Spacing & Layout
- **Consistent Spacing**: 8px grid system throughout
- **Card Layouts**: Rounded corners with proper padding
- **Grid System**: Responsive grid with proper gaps
- **Container Widths**: Max-width containers for readability

## 🚀 **Getting Started**

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
```bash
cd restaurant-analytics-frontend
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

## 📱 **Responsive Breakpoints**

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎭 **Animation System**

### Transitions
- **Duration**: 200ms - 300ms for smooth interactions
- **Easing**: ease-out for natural feel
- **Properties**: transform, opacity, box-shadow

### Hover Effects
- **Scale**: Subtle 5% scale on hover
- **Shadow**: Enhanced shadows on interaction
- **Color**: Background color transitions

### Loading States
- **Skeleton Screens**: Placeholder content while loading
- **Spinners**: Animated loading indicators
- **Shimmer Effects**: Subtle loading animations

## 🔧 **Customization**

### Theme Colors
Modify the color scheme in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
        }
      }
    }
  }
}
```

### Component Variants
Each component supports multiple variants:

```jsx
<StatsCard 
  color="blue"        // blue, green, purple, yellow, red, indigo, pink, emerald
  size="default"      // small, default, large
  trend="up"          // up, down, neutral, stable
/>
```

## 📊 **Chart Customization**

### Chart Colors
Customize chart colors with CSS variables:

```css
.recharts-bar-rectangle {
  fill: var(--chart-color, #3b82f6);
}
```

### Tooltip Styling
Enhanced tooltips with custom styling:

```jsx
<Tooltip 
  contentStyle={{
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    boxShadow: '0 20px 25px rgba(0,0,0,0.1)'
  }}
/>
```

## 🎯 **Performance Optimizations**

- **Lazy Loading**: Components loaded on demand
- **Memoization**: React.memo for expensive components
- **CSS-in-JS**: Efficient styling with Tailwind
- **Bundle Splitting**: Code splitting for better performance

## 🧪 **Testing**

```bash
npm run test
npm run test:coverage
```

## 📝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License.

## 🙏 **Acknowledgments**

- **Tailwind CSS** for the utility-first CSS framework
- **Recharts** for the beautiful charting library
- **React Team** for the amazing framework
- **Design Community** for inspiration and best practices

---

**Built with ❤️ for better restaurant analytics**
