# ByteBistro — Full-Stack FoodTech Web Application

ByteBistro is a modern, responsive food delivery platform and kitchen management system built with React, TypeScript, and Tailwind CSS.

## Key Features

### 1. Customer Storefront
- **Categorized Menu:** Browse Fast Food, Healthy, and Dessert selections with dynamic filters and search.
- **Localized Pricing:** Full Indian Rupee (₹) pricing structure with standard 5% GST and delivery fees.
- **Cart & Simulated Checkout:** Slide-out drawer with real-time total calculations, delivery address capture, and simulated payment gateway.

### 2. Live Restaurant Dashboard
- **Real-Time Order Flow:** Multi-stage Kanban tracking (Pending → Preparing → Ready → Completed).
- **Kitchen Metrics:** Instant KPI cards tracking daily revenue, active tickets, prep time, and inventory status.
- **Inventory Tracking:** Live stock meters with automated low-stock warnings.
- **Data Persistence:** LocalStorage state syncing ensures orders placed on the storefront immediately update the kitchen dashboard without server latency.

## Getting Started Locally

1. Install dependencies:
   ```bash
   npm install