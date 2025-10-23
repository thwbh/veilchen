# veilchen

![veilchen logo](./static/logo_128.png)

veilchen is a set of reusable Svelte 5 components for mobile apps, styled with DaisyUI.

## Features

- 🎯 Built for mobile-first applications
- 🎨 Styled with DaisyUI themes
- 📱 Touch-optimized components
- ⌨️ Keyboard navigation support
- ♿ ARIA-compliant accessibility
- 📘 Full TypeScript support with generics
- 📚 Complete JSDoc documentation

## Requirements

- [Svelte 5](https://svelte.dev/docs/svelte/overview)
- [DaisyUI 5](https://daisyui.com/docs/v5/)
- [Tailwind CSS 4](https://tailwindcss.com/docs/installation/using-vite)

### Peer Dependencies

The following dependencies are included with veilchen and will be automatically available:

- [Chart.js](https://www.chartjs.org/) - Powers the chart components (LineChart, BarChart, PolarAreaChart)
- [svelte-gestures](https://github.com/Rezi/svelte-gestures) - Enables swipe functionality in the Stack component

## Installation

```bash
npm install -D @thwbh/veilchen daisyui
```

All dependencies including Chart.js and svelte-gestures are bundled with veilchen, so no additional installation is required.

## Setup

Follow the DaisyUI installation guide including custom theme setup.

Open your `style.css` file and insert this line after `@import 'tailwindcss'`:

```css
@source '../node_modules/@thwbh/veilchen';
```

This is required because Tailwind's JIT compiler does not scan the `node_modules` folder when excluded in `.gitignore`.

### Custom Theme

veilchen includes a custom DaisyUI theme inspired by violet flowers. The theme features:

- **Primary**: Deep purple - from the flower center
- **Secondary**: Light lavender - from the petals
- **Accent**: Golden yellow - from the flower's center
- **Base**: Clean white with subtle purple tints

The theme is defined using modern OKLCH color space for perceptually uniform colors and better accessibility. All colors meet WCAG contrast requirements.

To use the veilchen theme in your project, add it to your `style.css`:

```css
@import 'tailwindcss';
@config '../tailwind.config.js';

@plugin "daisyui";

@plugin "daisyui/theme" {
	name: veilchen;
	color-scheme: light;

	/* Primary: Deep purple from the flower center */
	--color-primary: oklch(48% 0.18 295);
	--color-primary-content: oklch(98% 0.01 295);

	/* Secondary: Light lavender from the petals */
	--color-secondary: oklch(75% 0.12 295);
	--color-secondary-content: oklch(25% 0.08 295);

	/* Accent: Yellow from the flower center */
	--color-accent: oklch(85% 0.15 95);
	--color-accent-content: oklch(25% 0.05 95);

	/* Neutral: Soft gray-purple */
	--color-neutral: oklch(40% 0.05 295);
	--color-neutral-content: oklch(95% 0.02 295);

	/* Base colors: Light background with slight purple tint */
	--color-base-100: oklch(100% 0 0);
	--color-base-200: oklch(97% 0.01 295);
	--color-base-300: oklch(94% 0.02 295);
	--color-base-content: oklch(25% 0.03 295);

	/* State colors */
	--color-info: oklch(65% 0.2 240);
	--color-info-content: oklch(98% 0.01 240);
	--color-success: oklch(70% 0.18 145);
	--color-success-content: oklch(20% 0.05 145);
	--color-warning: oklch(80% 0.18 80);
	--color-warning-content: oklch(25% 0.05 80);
	--color-error: oklch(60% 0.25 25);
	--color-error-content: oklch(98% 0.01 25);

	/* Border radius - soft and organic like flower petals */
	--radius-box: 1rem;
	--radius-selector: 0.5rem;
	--radius-field: 0.5rem;
	--border: 0px;
}
```

Then activate the theme by adding `data-theme="veilchen"` to your `<html>` tag in `src/app.html`:

```html
<html lang="en" data-theme="veilchen"></html>
```

## Components

veilchen provides 12 components organized by category:

### Input Components

- **ButtonGroup** - Segmented control for multiple choice selection
- **RangeInput** - Range slider with value display and steps
- **ValidatedInput** - Input field with built-in validation display

### List Components

- **ListPicker** - Selectable list with labels and descriptions
- **OptionCards** - Rich card-based option selector with metrics

### Display Components

- **AlertBox** - Alert messages with different types (info, error, warning, success)
- **ModalDialog** - Customizable modal dialog

### Layout Components

- **Stack** - Swipeable card stack with keyboard navigation
- **Stepper** - Multi-step wizard with progress indicator

### Chart Components

- **LineChart** - Line chart powered by Chart.js
- **BarChart** - Bar chart powered by Chart.js
- **PolarAreaChart** - Polar area chart powered by Chart.js

## Usage

### Importing Types

```typescript
import {
	ButtonGroup,
	ListPicker,
	type KeyValuePair,
	type ListPickerData,
	type OptionCardData
} from '@thwbh/veilchen';
```

### ButtonGroup

A segmented control for selecting between multiple options.

**Props:**

- `value` - Currently selected value (bindable)
- `entries` - Array of KeyValuePair options
- `label` - Optional label text
- `onchange` - Callback fired when selection changes
- `class` - Optional CSS class

#### Example 1: Basic Button Group

```svelte
<script lang="ts">
	import { ButtonGroup, type KeyValuePair } from '@thwbh/veilchen';

	let value = $state('y');

	const entries: KeyValuePair<string, string>[] = [
		{ key: 'y', value: 'Yes' },
		{ key: 'n', value: 'No' }
	];
</script>

<ButtonGroup label="Confirm?" bind:value {entries} />
```

#### Example 2: With Change Handler

```svelte
<script lang="ts">
	import { ButtonGroup, type KeyValuePair } from '@thwbh/veilchen';

	let selectedValue = $state('a');

	const entries: KeyValuePair<string, string>[] = [
		{ key: 'a', value: 'Option A' },
		{ key: 'b', value: 'Option B' },
		{ key: 'c', value: 'Option C' }
	];

	function handleChange(value: string) {
		console.log('Selected:', value);
	}
</script>

<ButtonGroup
	label="Choose an option"
	bind:value={selectedValue}
	{entries}
	onchange={handleChange}
/>
```

#### Example 3: With Numbers

```svelte
<script lang="ts">
	import { ButtonGroup, type KeyValuePair } from '@thwbh/veilchen';

	let rating = $state(3);

	const entries: KeyValuePair<number, string>[] = [
		{ key: 1, value: '⭐' },
		{ key: 2, value: '⭐⭐' },
		{ key: 3, value: '⭐⭐⭐' },
		{ key: 4, value: '⭐⭐⭐⭐' },
		{ key: 5, value: '⭐⭐⭐⭐⭐' }
	];
</script>

<ButtonGroup label="Rate this" bind:value={rating} {entries} />
```

### RangeInput

A range slider with value display and visual step indicators.

**Props:**

- `value` - Current value (bindable, number)
- `min` - Minimum value
- `max` - Maximum value
- `label` - Optional label text
- `step` - Step increment
- `unit` - Optional unit to display after value
- `class` - Optional CSS class for the range element
- `onchange` - Callback fired when value changes

#### Example 1: Basic Range Input

```svelte
<script lang="ts">
	import { RangeInput } from '@thwbh/veilchen';

	let volume = $state(50);
</script>

<RangeInput label="Volume" bind:value={volume} min={0} max={100} unit="%" />
```

#### Example 2: With Steps and Custom Styling

```svelte
<script lang="ts">
	import { RangeInput } from '@thwbh/veilchen';

	let brightness = $state(25);
</script>

<RangeInput
	label="Brightness"
	bind:value={brightness}
	min={0}
	max={100}
	step={25}
	class="range-primary"
	unit="lux"
/>
```

### ValidatedInput

Input field with built-in HTML5 validation and error message display.

**Props:**

- `value` - Current value (bindable, string or number)
- `label` - Label text
- `type` - Input type (text, email, password, number, date, etc.)
- `required` - Whether field is required
- `pattern` - Regex pattern for validation
- `minlength` / `maxlength` - Length constraints
- `min` / `max` - Numeric constraints
- `unit` - Optional unit displayed after input
- `errorInline` - Display error inline instead of below
- `class` - Optional CSS class
- `children` - Snippet for validation message

#### Example 1: Email Validation

```svelte
<script lang="ts">
	import { ValidatedInput } from '@thwbh/veilchen';

	let email = $state('');
</script>

<ValidatedInput
	bind:value={email}
	label="Email Address"
	type="email"
	required
	placeholder="your@email.com"
>
	Please enter a valid email address
</ValidatedInput>
```

#### Example 2: Password with Pattern

```svelte
<script lang="ts">
	import { ValidatedInput } from '@thwbh/veilchen';

	let password = $state('');
</script>

<ValidatedInput
	bind:value={password}
	label="Password"
	type="password"
	required
	minlength={8}
	pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{'{'}8,{'}'}"
>
	Must be 8+ characters with uppercase, lowercase, and number
</ValidatedInput>
```

### ListPicker

Selectable list with headers, descriptions, and optional labels.

**Props:**

- `value` - Currently selected value (bindable)
- `data` - Array of ListPickerData items
- `header` - Optional header snippet
- `onchange` - Callback fired when selection changes

#### Example

```svelte
<script lang="ts">
	import { ListPicker, type ListPickerData } from '@thwbh/veilchen';

	let selected = $state(2);

	const options: ListPickerData<number>[] = [
		{
			value: 1,
			header: 'Basic Plan',
			description: 'Perfect for individuals',
			label: { text: 'Popular', className: 'badge-primary' }
		},
		{
			value: 2,
			header: 'Pro Plan',
			description: 'For professionals',
			label: { text: 'Best Value', className: 'badge-success' }
		},
		{
			value: 3,
			header: 'Enterprise',
			description: 'For large teams'
		}
	];
</script>

<ListPicker bind:value={selected} data={options}>
	{#snippet header()}
		<span>Choose your plan</span>
	{/snippet}
</ListPicker>
```

### OptionCards

Rich card-based option selector with custom icons, badges, and metrics.

**Props:**

- `value` - Currently selected value (bindable)
- `data` - Array of OptionCardData items
- `header` - Optional header snippet
- `icon` - Optional icon snippet (receives OptionCardData)
- `scrollable` - Enable scrolling (default: true)
- `maxHeight` - Maximum height when scrollable
- `onchange` - Callback fired when selection changes

#### Example 1: With Emoji Icons

```svelte
<script lang="ts">
	import { OptionCards, type OptionCardData } from '@thwbh/veilchen';

	let selected = $state('plan-a');

	const plans: OptionCardData<string>[] = [
		{
			value: 'plan-a',
			header: 'Starter',
			badge: { text: 'Free', color: 'success' },
			metrics: [
				{ label: 'Users', value: '5' },
				{ label: 'Storage', value: '10GB' }
			]
		},
		{
			value: 'plan-b',
			header: 'Professional',
			highlight: { text: 'Recommended', color: 'primary' },
			badge: { text: '$29/mo', color: 'primary' },
			metrics: [
				{ label: 'Users', value: '50' },
				{ label: 'Storage', value: '500GB' },
				{ label: 'Support', value: '24/7' }
			]
		}
	];

	const icons: Record<string, string> = {
		'plan-a': '🚀',
		'plan-b': '⭐'
	};
</script>

<OptionCards bind:value={selected} data={plans}>
	{#snippet icon(option)}
		<span class="text-2xl">{icons[option.value]}</span>
	{/snippet}
</OptionCards>
```

#### Example 2: With Custom Components

```svelte
<OptionCards bind:value={selected} data={plans}>
	{#snippet icon(option)}
		<div class="avatar placeholder">
			<div class="bg-primary text-primary-content w-10 rounded-full">
				<span class="text-xs">{option.value.slice(0, 2)}</span>
			</div>
		</div>
	{/snippet}
</OptionCards>
```

#### Example 3: Without Icons

```svelte
<!-- Icons are completely optional -->
<OptionCards bind:value={selected} data={plans} />
```

### AlertBox

Alert messages with different severity types.

**Props:**

- `type` - Alert type (AlertType.Info, Error, Warning, Success)
- `class` - Optional CSS class
- `icon` - Optional custom icon snippet
- `children` - Alert content

#### Example

```svelte
<script lang="ts">
	import { AlertBox, AlertType } from '@thwbh/veilchen';
</script>

<AlertBox type={AlertType.Success}>
	<strong>Success!</strong>
	<span>Your changes have been saved.</span>
</AlertBox>

<AlertBox type={AlertType.Warning} class="alert-soft">
	<strong>Warning:</strong>
	<span>Please review your input.</span>
</AlertBox>
```

### Stack

Swipeable card stack with keyboard navigation (Arrow Left/Right).

**Props:**

- `index` - Current visible card index (bindable)
- `size` - Total number of cards
- `card` - Card content snippet
- `indicator` - Optional custom indicator snippet
- `swipeable` - Enable swipe gestures (default: true)
- `onchange` - Callback fired when card changes
- `onswipe` - Callback fired on swipe gesture

#### Example

```svelte
<script lang="ts">
	import { Stack } from '@thwbh/veilchen';
	import { fly } from 'svelte/transition';

	let currentIndex = $state(0);
	const cards = ['Card 1', 'Card 2', 'Card 3'];
</script>

<Stack
	bind:index={currentIndex}
	size={cards.length}
	onchange={(idx) => console.log('Now showing:', idx)}
>
	{#snippet card(index, flyParams)}
		{#if index === currentIndex}
			<div class="card bg-base-100 shadow-xl" transition:fly={flyParams}>
				<div class="card-body">
					<h2 class="card-title">{cards[index]}</h2>
					<p>Swipe or use arrow keys to navigate</p>
				</div>
			</div>
		{/if}
	{/snippet}
</Stack>
```

### Stepper

Multi-step wizard with progress indicator and navigation controls.

**Props:**

- `currentStep` - Current active step number (bindable, 1-indexed)
- `stepLabel` - Label text for step badges (default: "Step")
- `backLabel` - Back button label (default: "Previous")
- `nextLabel` - Next button label (default: "Next Step")
- `finishLabel` - Finish button label (default: "Finish")
- `activeClass` - CSS class for active step (default: "badge-neutral")
- `onnext` - Callback when next is clicked
- `onback` - Callback when back is clicked
- `onfinish` - Callback when finish is clicked
- Step snippets (`step1`, `step2`, etc.)

#### Example

```svelte
<script lang="ts">
	import { Stepper } from '@thwbh/veilchen';

	let currentStep = $state(1);

	function handleNext() {
		console.log('Moving to next step');
	}

	function handleFinish() {
		console.log('Wizard completed!');
	}
</script>

<Stepper bind:currentStep onnext={handleNext} onfinish={handleFinish} activeClass="badge-primary">
	{#snippet step1()}
		<div class="p-4">
			<h3 class="font-bold">Step 1: Personal Info</h3>
			<p>Enter your details here</p>
		</div>
	{/snippet}

	{#snippet step2()}
		<div class="p-4">
			<h3 class="font-bold">Step 2: Preferences</h3>
			<p>Set your preferences</p>
		</div>
	{/snippet}

	{#snippet step3()}
		<div class="p-4">
			<h3 class="font-bold">Step 3: Review</h3>
			<p>Review and confirm</p>
		</div>
	{/snippet}
</Stepper>
```

### ModalDialog

Customizable modal dialog with confirm/cancel actions.

**Props:**

- `dialog` - Dialog element reference (bindable)
- `title` - Optional title snippet
- `content` - Optional content snippet
- `footer` - Optional footer snippet (overrides default buttons)
- `onconfirm` - Callback when confirm is clicked
- `oncancel` - Callback when cancel is clicked

#### Example

```svelte
<script lang="ts">
	import { ModalDialog } from '@thwbh/veilchen';

	let dialog: HTMLDialogElement;

	function handleConfirm() {
		console.log('Confirmed!');
	}
</script>

<button class="btn" onclick={() => dialog?.showModal()}> Open Dialog </button>

<ModalDialog bind:dialog onconfirm={handleConfirm}>
	{#snippet title()}
		<h3 class="text-lg font-bold">Confirm Action</h3>
	{/snippet}

	{#snippet content()}
		<p>Are you sure you want to proceed?</p>
	{/snippet}
</ModalDialog>
```

### Chart Components

Chart components powered by Chart.js. All three share the same props structure.

**Props:**

- `data` - Chart.js data configuration
- `options` - Chart.js options configuration
- All HTMLCanvasAttributes (width, height, class, etc.)

#### LineChart Example

```svelte
<script lang="ts">
	import { LineChart } from '@thwbh/veilchen';

	const data = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
		datasets: [
			{
				label: 'Sales',
				data: [12, 19, 3, 5, 2],
				borderColor: 'rgb(75, 192, 192)',
				tension: 0.1
			}
		]
	};

	const options = {
		responsive: true,
		plugins: {
			legend: { position: 'top' }
		}
	};
</script>

<LineChart {data} {options} />
```

#### BarChart Example

```svelte
<script lang="ts">
	import { BarChart } from '@thwbh/veilchen';

	const data = {
		labels: ['Q1', 'Q2', 'Q3', 'Q4'],
		datasets: [
			{
				label: 'Revenue',
				data: [65, 59, 80, 81],
				backgroundColor: 'rgba(54, 162, 235, 0.5)'
			}
		]
	};
</script>

<BarChart {data} options={{}} />
```

#### PolarAreaChart Example

```svelte
<script lang="ts">
	import { PolarAreaChart } from '@thwbh/veilchen';

	const data = {
		labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
		datasets: [
			{
				data: [11, 16, 7, 3, 14],
				backgroundColor: [
					'rgb(255, 99, 132)',
					'rgb(75, 192, 192)',
					'rgb(255, 205, 86)',
					'rgb(201, 203, 207)',
					'rgb(54, 162, 235)'
				]
			}
		]
	};
</script>

<PolarAreaChart {data} options={{}} />
```

## TypeScript Support

All components have full TypeScript support with generics where appropriate:

```typescript
// Generic types for flexible data structures
type KeyValuePair<K = string | number, V = string> = {
	key: K;
	value: V;
};

type ListPickerData<T = unknown> = {
	value: T;
	header: string;
	label?: ListPickerLabel;
	description: string;
};

type OptionCardData<T = unknown> = {
	value: T;
	header: string;
	badge?: OptionCardBadge;
	highlight?: OptionCardBadge;
	metrics?: Array<OptionCardMetric>;
};
```

### Styling Components

All components accept a `class` prop for custom styling. Since `class` is a reserved keyword in JavaScript, it is internally mapped to avoid conflicts:

```svelte
<!-- Apply custom classes to components -->
<ButtonGroup class="my-custom-class" {entries} bind:value />
<RangeInput class="range-primary" bind:value min={0} max={100} />
<AlertBox class="alert-soft" type={AlertType.Warning}>Warning message</AlertBox>
```

## Accessibility

All components include ARIA attributes and keyboard support:

- **ButtonGroup**: `role="group"`, `aria-pressed`, `aria-labelledby`
- **ListPicker**: `aria-pressed` on list items
- **OptionCards**: `aria-pressed` on cards
- **Stack**: Keyboard navigation with Arrow Left/Right, `role="region"`, `aria-live="polite"`
- **Stepper**: Keyboard navigation with Arrow keys (Left/Up for previous, Right/Down for next), `role="navigation"`
- **ValidatedInput**: Native HTML5 validation with error messages

## License

MIT

## Contributing

Issues and pull requests are welcome on [GitHub](https://github.com/thwbh/veilchen).
