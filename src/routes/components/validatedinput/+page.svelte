<script lang="ts">
	import ValidatedInput from '$lib/components/input/ValidatedInput.svelte';

	// Example 1: Email Validation
	let email = $state('');

	// Example 2: Password with Pattern
	let password = $state('');

	// Example 3: Username with Min/Max Length
	let username = $state('');

	// Example 4: URL Validation
	let website = $state('');

	// Example 5: Number Input with Unit
	let weight = $state<number | string>('');

	// Example 6: Phone Number Pattern
	let phone = $state('');

	// Example 7: Date Input
	let birthdate = $state('');

	// Example 8: Required Text with Inline Error
	let fullname = $state('');

	// Example 9: Postal Code Pattern
	let postalCode = $state('');
</script>

<div class="flex flex-col gap-6 p-4">
	<h1 class="mb-4 text-3xl font-bold">ValidatedInput Examples</h1>
	<p class="mb-2 text-sm opacity-70">
		Input component with built-in HTML5 validation and error message display
	</p>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 1: Email Validation</h2>
		<p class="mb-4 text-sm opacity-70">Built-in HTML5 email validation</p>

		<ValidatedInput
			bind:value={email}
			label="Email Address"
			type="email"
			required
			placeholder="your@email.com"
		>
			Please enter a valid email address
		</ValidatedInput>

		<div class="bg-base-200 rounded-box mt-4 p-4">
			<p class="text-sm">
				<strong>Email:</strong>
				{email || '(empty)'}
			</p>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 2: Password with Pattern</h2>
		<p class="mb-4 text-sm opacity-70">Complex validation with regex pattern</p>

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

		<div class="bg-base-200 rounded-box mt-4 p-4">
			<p class="text-sm">
				<strong>Password length:</strong>
				{password.length} characters
			</p>
			<p class="mt-1 text-xs opacity-70">
				{#if password.length >= 8}
					✓ Length OK
				{:else}
					✗ Too short
				{/if}
				·
				{#if /[A-Z]/.test(password)}
					✓ Uppercase OK
				{:else}
					✗ Missing uppercase
				{/if}
				·
				{#if /[a-z]/.test(password)}
					✓ Lowercase OK
				{:else}
					✗ Missing lowercase
				{/if}
				·
				{#if /\d/.test(password)}
					✓ Number OK
				{:else}
					✗ Missing number
				{/if}
			</p>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 3: Username with Min/Max Length</h2>
		<p class="mb-4 text-sm opacity-70">Text input with length constraints</p>

		<ValidatedInput
			bind:value={username}
			label="Username"
			type="text"
			required
			minlength={3}
			maxlength={20}
			placeholder="johndoe"
		>
			Username must be 3-20 characters
		</ValidatedInput>

		<div class="bg-base-200 rounded-box mt-4 p-4">
			<p class="text-sm">
				<strong>Username:</strong>
				{username || '(empty)'}
			</p>
			<p class="mt-1 text-xs opacity-70">Length: {username.length}/20 characters</p>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 4: URL Validation</h2>
		<p class="mb-4 text-sm opacity-70">Built-in URL validation</p>

		<ValidatedInput
			bind:value={website}
			label="Website"
			type="url"
			placeholder="https://example.com"
		>
			Please enter a valid URL (including https://)
		</ValidatedInput>

		<div class="bg-base-200 rounded-box mt-4 p-4">
			<p class="text-sm">
				<strong>Website:</strong>
				{website || '(empty)'}
			</p>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 5: Number Input with Unit</h2>
		<p class="mb-4 text-sm opacity-70">Number validation with unit display</p>

		<ValidatedInput
			bind:value={weight}
			label="Weight"
			type="number"
			min={1}
			max={500}
			unit="kg"
			placeholder="70"
		>
			Enter weight between 1 and 500 kg
		</ValidatedInput>

		<div class="bg-base-200 rounded-box mt-4 p-4">
			<p class="text-sm">
				<strong>Weight:</strong>
				{weight || '(empty)'}
				{weight ? 'kg' : ''}
			</p>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 6: Phone Number Pattern</h2>
		<p class="mb-4 text-sm opacity-70">Custom regex pattern for phone validation</p>

		<ValidatedInput
			bind:value={phone}
			label="Phone Number"
			type="tel"
			pattern="[0-9]{'{'}3{'}'}-[0-9]{'{'}3{'}'}-[0-9]{'{'}4{'}'}"
			placeholder="123-456-7890"
		>
			Format: XXX-XXX-XXXX
		</ValidatedInput>

		<div class="bg-base-200 rounded-box mt-4 p-4">
			<p class="text-sm">
				<strong>Phone:</strong>
				{phone || '(empty)'}
			</p>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 7: Date Input</h2>
		<p class="mb-4 text-sm opacity-70">Date picker with min/max constraints</p>

		<ValidatedInput
			bind:value={birthdate}
			label="Date of Birth"
			type="date"
			required
			min="1900-01-01"
			max="2010-12-31"
		>
			Please select a date between 1900 and 2010
		</ValidatedInput>

		<div class="bg-base-200 rounded-box mt-4 p-4">
			<p class="text-sm">
				<strong>Date of Birth:</strong>
				{birthdate || '(empty)'}
			</p>
			{#if birthdate}
				<p class="mt-1 text-xs opacity-70">
					Age: {new Date().getFullYear() - new Date(birthdate).getFullYear()} years
				</p>
			{/if}
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 8: Inline Error Display</h2>
		<p class="mb-4 text-sm opacity-70">Error message displayed inline instead of below</p>

		<ValidatedInput
			bind:value={fullname}
			label="Full Name"
			type="text"
			required
			minlength={2}
			errorInline={true}
			placeholder="John Doe"
		>
			Name is required
		</ValidatedInput>

		<div class="bg-base-200 rounded-box mt-4 p-4">
			<p class="text-sm">
				<strong>Full Name:</strong>
				{fullname || '(empty)'}
			</p>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 9: Postal Code with Custom Pattern</h2>
		<p class="mb-4 text-sm opacity-70">5-digit postal code validation</p>

		<ValidatedInput
			bind:value={postalCode}
			label="Postal Code"
			type="text"
			pattern="[0-9]{'{'}5{'}'}"
			placeholder="12345"
		>
			Enter a 5-digit postal code
		</ValidatedInput>

		<div class="bg-base-200 rounded-box mt-4 p-4">
			<p class="text-sm">
				<strong>Postal Code:</strong>
				{postalCode || '(empty)'}
			</p>
		</div>
	</div>
</div>
