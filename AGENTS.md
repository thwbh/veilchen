# Veilchen - Project Summary

A mobile-first Svelte 5 component library built on DaisyUI/TailwindCSS.

## Tech Stack

- **Framework:** Svelte 5.0.0 / SvelteKit 2.16.0
- **Styling:** TailwindCSS 4.0.0 + DaisyUI 5.0.12
- **Charts:** Chart.js 4.4.8 (peer dependency)
- **Testing:** Vitest 4.1.0 + @testing-library/svelte
- **Build:** Vite 6.2.5

## Directory Structure

```
src/lib/
├── components/     # Main component library (33 components)
├── types/          # TypeScript definitions
├── enum/           # AlertType, TextSize, MenuSize, DockSize, InputSize
├── chart/          # Chart.js type props
├── gesture/        # Long press utilities
├── utils/          # Refresh context utilities
└── index.ts        # Main exports
```

## Implemented Components (33)

### Input (6)

- **ButtonGroup** - Segmented control with generic key/value support
- **RangeInput** - Range slider with text input and visual steps
- **ValidatedInput** - Input with HTML5 validation
- **NumberStepper** - Numeric input with +/- buttons
- **NumberWheel / InlineNumberWheel** - Scroll-wheel number input
- **SearchBar** - Search input with debounce, clear button, and slot for result suffix

### List (3)

- **ListPicker** - Selectable list with headers, descriptions, badges
- **OptionCards** - Card-based option selector with metrics
- **SwipeableListItem** - Swipe-to-reveal actions

### Display (6)

- **AlertBox** - Alert messages (info, error, warning, success)
- **Card** - Styled card container
- **StatCard** - Statistics display with title, value, icon
- **ModalDialog** - Customizable modal dialogs
- **LoadingIndicator** - Animated loading spinner
- **CircularProgress** - Circular progress with percentage

### Layout (3)

- **Stack** - Swipeable card stack with keyboard navigation
- **StackCard** - Individual card for Stack
- **AppShell** - Layout wrapper with header/footer/sidebar

### Navigation (3)

- **NavBar** - Header navigation with dropdowns
- **BottomNavigation** - Mobile bottom nav bar
- **Breadcrumbs** - Navigation breadcrumb trail

### Charts (3)

- **LineChart** - Line chart (Chart.js)
- **BarChart** - Bar chart (Chart.js)
- **PolarAreaChart** - Polar area chart (Chart.js)

### Specialized (5)

- **Stepper** - Multi-step wizard with progress
- **Menu** - Hierarchical menu with submenus
- **Avatar** - Single avatar with DiceBear support
- **AvatarGroup** - Group of avatars with overflow
- **AvatarPicker** - Avatar selector

### Gesture & System (4)

- **LongPressContainer** - Long-press gesture detection
- **PullToRefresh** - Pull-to-refresh handler
- **ToastContainer** - Toast notification system
- **Toast Store** - Reactive toast management

## Component Patterns

### Props Interface

```typescript
interface Props {
	/** JSDoc for each prop */
	prop1?: string;
	children?: Snippet;
	class?: string; // Mapped to className internally
}

let { prop1, children, class: className = '', ...props } = $props();
```

### Two-Way Binding

```typescript
let { value = $bindable() } = $props();
```

### Generics

Components use generics for type safety:

- `KeyValuePair<K, V>` - Flexible key/value pairs
- `ListPickerData<T>` - Type-safe list data
- `OptionCardData<T>` - Type-safe card data

### Accessibility

- ARIA roles and attributes throughout
- Keyboard navigation (Arrow keys, Enter, Escape)
- HTML5 form validation

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Build library
npm run check        # Type checking
npm run test         # Run tests
npm run lint         # Lint code
npm run format       # Format code
```

## Custom Theme

Custom DaisyUI theme "veilchen" (violet-inspired):

- Primary: Deep purple `oklch(48% 0.18 295)`
- Secondary: Light lavender `oklch(75% 0.12 295)`
- Accent: Golden yellow `oklch(85% 0.15 95)`

## Important Notes

1. **Tailwind Scanning:** Users must add `@source '../node_modules/@thwbh/veilchen'` to their CSS for JIT compilation

2. **Mobile-First:** All components optimized for touch with swipe gestures

3. **Peer Dependencies:** Chart.js, DaisyUI, Svelte 5 are peer deps

4. **Publishing:** Uses `@sveltejs/package` to compile to `dist/`

## Planned Components

- Skeleton Loader
- Tabs / Tab Bar
- Badge / Notification Badge
- Accordion / Collapsible
- Chip / Tag
- Empty State
- Loading Spinner (enhanced)
