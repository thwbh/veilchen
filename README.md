# veilchen

veilchen is a set of reusable Svelte components, styled with DaisyUI.

Requirements:

- [Svelte 5](https://svelte.dev/docs/svelte/overview)
- [DaisyUI 5](https://daisyui.com/docs/v5/)
- [tailwindcss 4](https://tailwindcss.com/docs/installation/using-vite)

## Setup

Follow the DaisyUI installation guide incl. custom theme setup.

```bash
npm i -D @thwbh/veilchen
```

Open your `style.css` file. Insert this line after `@import 'tailwindcss'`.

```css
@source '../node_modules/@thwbh/veilchen';
```

This needs to be inserted due to the fact that tailwind's JIT compiler will not scan the `node_modules` folder when excluded in `.gitignore`.

## Usage

### ButtonGroup.svelte

```sveltehtml
<script lang="ts">
    const entries = [
        new KeyValuePair('y', 'Yes'),
        new KeyValuePair('n', 'No')
    ];

    let value = $state('y');
</script>

<ButtonGroup label="Sex" bind:value {entries} />
```

### Example 1: Basic Button Group with Default Binding

```sveltehtml
<script lang="ts">
    import { ButtonGroup } from '@thwbh/veilchen';

    const entries = [
        new KeyValuePair('a', 'Option A'),
        new KeyValuePair('b', 'Option B'),
        new KeyValuePair('c', 'Option C')
    ];

    let value = $state('a'); // Default to 'Option A'
</script>

<ButtonGroup label="Choose an option" bind:value {entries} />
```

---

### Example 2: Button Group with Inline Entries

```sveltehtml
<script lang="ts">
    import { ButtonGroup } from '@thwbh/veilchen';

    let selectedValue = $state('1');
</script>

<ButtonGroup
    label="Select a Number"
    bind:value={selectedValue}
    entries={[
        new KeyValuePair('1', 'One'),
        new KeyValuePair('2', 'Two'),
        new KeyValuePair('3', 'Three')
    ]}
/>
```

---

### Example 3: Handling `on:change` Event

```sveltehtml
<script lang="ts">
    import { ButtonGroup } from '@thwbh/veilchen';

    const entries = [
        new KeyValuePair('x', 'Choice X'),
        new KeyValuePair('y', 'Choice Y'),
        new KeyValuePair('z', 'Choice Z')
    ];

    let selectedKey = $state('x');

    function handleChange(newValue: string) {
        console.log('Selected value changed to:', newValue);
    }
</script>

<ButtonGroup
    label="Pick a letter"
    bind:value={selectedKey}
    {entries}
    on:change={handleChange}
/>
```

## RangeInput.svelte Examples

### Example 1: Basic Range Input

```sveltehtml
<script lang="ts">
    import { RangeInput } from '@thwbh/veilchen';

    let value = $state(50); // Default value
</script>

<RangeInput
    label="Adjust Volume"
    bind:value
    min={0}
    max={100}
/>
```

---

### Example 2: Range Input with Custom Steps

```sveltehtml
<script lang="ts">
    import { RangeInput } from '@thwbh/veilchen';

    let brightness = $state(10); // Default value
</script>

<RangeInput
    label="Brightness"
    bind:value={brightness}
    min={0}
    max={50}
    step={5}
/>
```

---

## Stack.svelte Examples

### Example 1: Basic Stack Layout

```sveltehtml
<script lang="ts">
    import { Stack } from '@thwbh/veilchen';
</script>

<Stack>
    <div class="p-4 bg-base-200">Element 1</div>
    <div class="p-4 bg-base-300">Element 2</div>
    <div class="p-4 bg-base-200">Element 3</div>
</Stack>
```

---

### Example 2: Stack with Gap and Vertical Alignment

```sveltehtml
<script lang="ts">
    import { Stack } from '@thwbh/veilchen';
</script>

<Stack gap="4" vertical>
    <div class="p-4 bg-base-200">Header</div>
    <div class="p-4 bg-base-300">Main Content</div>
    <div class="p-4 bg-base-200">Footer</div>
</Stack>
```

## ValidatedInput.svelte Examples

### Example 1: Basic Input with Validation

```sveltehtml

<script lang="ts">
	import { ValidatedInput } from '@thwbh/veilchen';

	let value = $state('');
	let errorMessage = '';
</script>

<ValidatedInput
	label="Username"
	bind:value
	validate={(value) => value.length > 0 ? '' : 'This field is required'}
>
	<p class="text-error">{errorMessage}</p>
</ValidatedInput>
```

---

### Example 2: Input with Regex Validation

```sveltehtml
<script lang="ts">
    import { ValidatedInput } from '@thwbh/veilchen';

    let password = $state('');
</script>

<ValidatedInput
	bind:value={password}
	label="Password"
	type="password"
	required
	placeholder="Password"
	minlength={8}
	pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]){'{'}3{'}'}"
	title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
>
	Must be more than 8 characters, including
	<br />At least one number
	<br />At least one lowercase letter
	<br />At least one uppercase letter
</ValidatedInput>
```

## Stepper.svelte Examples

### Example 1: Basic Usage

```sveltehtml
<Stepper
		bind:currentStep={current}
		onnext={handleNextStep}
		onback={handleBackStep}
		onfinish={handleFinish}
		activeClass={'badge-primary'}
	>
		{#snippet step1()}
			<div>
				<strong>Header 1</strong>
				<span>Content 1</span>
			</div>
		{/snippet}
		{#snippet step2()}
			<div>
				<strong>Header 2</strong>
				<span>Content 2</span>
			</div>
		{/snippet}
		{#snippet step3()}
			<div>
				<strong>Header 3</strong>
				<span>Content 3</span>
			</div>
		{/snippet}
		{#snippet step4()}
			<div>
				<strong>Header 4</strong>
				<span>Content 4</span>
			</div>
		{/snippet}
	</Stepper>
```
