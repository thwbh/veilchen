# Snackbar Component

A transient notification surface with optional action button, designed for the "undo" pattern and other user feedback scenarios.

## Features

- **Action Support**: Optional action button (e.g., "Undo")
- **Dismiss Callbacks**: `onDismiss(reason)` callback with reason ('timeout', 'action', 'manual')
- **Swipe to Dismiss**: Mobile-friendly swipe gestures
- **Accessible**: ARIA live regions and keyboard navigation
- **Customizable**: Position, duration, and styling options

## Installation

```svelte
<script lang="ts">
	import { SnackbarContainer, snackbar } from '@thwbh/veilchen';
	import { SnackbarDismissReason } from '@thwbh/veilchen';
</script>

<SnackbarContainer />
```

## Usage

### Basic Snackbar

```svelte
<script lang="ts">
	import { snackbar } from '@thwbh/veilchen';

	function showSimpleSnackbar() {
		snackbar.show('Operation completed successfully');
	}
</script>

<button on:click={showSimpleSnackbar}>Show Snackbar</button>
```

### Snackbar with Action (Undo Pattern)

```svelte
<script lang="ts">
	import { snackbar } from '@thwbh/veilchen';
	import { SnackbarDismissReason } from '@thwbh/veilchen';

	let items = ['Item 1', 'Item 2', 'Item 3'];
	let deletedItems: string[] = [];

	function deleteItems() {
		// Optimistically delete items
		deletedItems = [...items];
		items = [];

		// Show snackbar with undo option
		snackbar.add('Items deleted', {
			actionLabel: 'Undo',
			onAction: () => {
				// Restore items when undo is clicked
				items = [...deletedItems];
				deletedItems = [];
			},
			onDismiss: (reason: SnackbarDismissReason) => {
				if (reason === 'timeout') {
					// Items were permanently deleted after timeout
					console.log('Items permanently deleted');
				} else if (reason === 'action') {
					// Items were restored via undo
					console.log('Items restored');
				}
			},
			duration: 5000 // 5 seconds to undo
		});
	}
</script>

<button on:click={deleteItems}>Delete Items</button>
```

## API

### SnackbarStore Methods

#### `add(message: string, options: SnackbarOptions): string`

Shows a snackbar with the given message and options.

**Parameters:**

- `message`: The text to display
- `options`: Configuration object
  - `actionLabel?: string` - Label for the action button
  - `onAction?: () => void` - Callback when action button is clicked
  - `onDismiss?: (reason: SnackbarDismissReason) => void` - Callback when snackbar is dismissed
  - `duration?: number` - Auto-dismiss timeout in ms (default: 5000)
  - `dismissible?: boolean` - Whether to show close button (default: true)

**Returns:** `string` - The snackbar ID

#### `show(message: string, actionLabel?: string, onAction?: () => void, duration?: number): string`

Convenience method for simple snackbars with action.

#### `dismiss(id: string, reason: SnackbarDismissReason): void`

Manually dismiss a snackbar.

#### `clear(): void`

Clear all snackbars.

### SnackbarContainer Props

| Prop             | Type     | Default   | Description                   |
| ---------------- | -------- | --------- | ----------------------------- | ----------------- | -------------------- |
| `position`       | `'top'   | 'bottom'` | `'bottom'`                    | Vertical position |
| `align`          | `'start' | 'center'  | 'end'`                        | `'center'`        | Horizontal alignment |
| `class`          | `string` | `''`      | Custom CSS class              |
| `swipeThreshold` | `number` | `100`     | Min swipe distance to dismiss |

### Types

```typescript
type SnackbarDismissReason = 'timeout' | 'action' | 'manual';

interface SnackbarMessage {
	id: string;
	message: string;
	actionLabel?: string;
	onAction?: () => void;
	onDismiss?: (reason: SnackbarDismissReason) => void;
	duration?: number;
	dismissible?: boolean;
}
```

## Accessibility

- Uses `role="alert"` and `aria-live="polite"` for screen reader announcements
- Action button is focusable and keyboard-navigable
- Swipe gestures work with both touch and pointer devices
- Proper contrast and sizing for mobile devices

## Examples

### Custom Duration

```svelte
snackbar.add('This will disappear quickly', {
  duration: 2000 // 2 seconds
});
```

### Non-dismissible Snackbar

```svelte
snackbar.add('Important message', {
  dismissible: false,
  duration: 0 // Must be manually dismissed
});
```

### Multiple Actions Pattern

While the component supports only one action button (following Material Design guidelines), you can chain actions:

```svelte
snackbar.add('File saved', {
  actionLabel: 'View',
  onAction: () => {
    // Show file
    snackbar.add('Opening file...', { duration: 2000 });
  }
});
```
