<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "$lib/components/ui/card";
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { goto } from "$app/navigation";

  let name = "";
  let email = "";
  let password = "";
  let confirmPassword = "";
  let emailWarning = "";
  let nameWarning = "";
  let passwordWarning = "";
  let confirmPasswordWarning = "";

  function handleSubmit() {
    // Validate all fields
    let hasError = false;

    if (!name.trim()) {
      nameWarning = "Name is required.";
      hasError = true;
    } else {
      nameWarning = "";
    }

    if (!isValidEmail(email)) {
      emailWarning = "Please enter a valid email address.";
      hasError = true;
    } else {
      emailWarning = "";
    }

    if (!password.trim()) {
      passwordWarning = "Password is required.";
      hasError = true;
    } else {
      passwordWarning = "";
    }

    if (password !== confirmPassword) {
      confirmPasswordWarning = "Passwords do not match.";
      hasError = true;
    } else {
      confirmPasswordWarning = "";
    }

    if (hasError) return;

    // Navigate to groups on successful validation
    goto("/groups");
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
    return emailRegex.test(email);
  }

  onMount(() => {
    const card = document.querySelector(".card");
    gsap.fromTo(
      card,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6 }
    );
  });
</script>

<div class="container mx-auto p-4 flex justify-center items-center min-h-screen">
  <Card class="w-full max-w-md card">
    <CardHeader>
      <CardTitle>Sign Up</CardTitle>
    </CardHeader>
    <CardContent>
      <form on:submit|preventDefault={handleSubmit} class="space-y-4">
        <div class="space-y-2">
          <Label for="name" class={nameWarning ? "text-red-500" : ""}>Name</Label>
          <Input id="name" type="text" placeholder="Enter your name" bind:value={name} required />
          {#if nameWarning}
            <p class="text-red-500 text-sm">{nameWarning}</p>
          {/if}
        </div>
        <div class="space-y-2">
          <Label for="email" class={emailWarning ? "text-red-500" : ""}>Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" bind:value={email} required />
          {#if emailWarning}
            <p class="text-red-500 text-sm">{emailWarning}</p>
          {/if}
        </div>
        <div class="space-y-2">
          <Label for="password" class={passwordWarning ? "text-red-500" : ""}>Password</Label>
          <Input id="password" type="password" placeholder="Enter your password" bind:value={password} required />
          {#if passwordWarning}
            <p class="text-red-500 text-sm">{passwordWarning}</p>
          {/if}
        </div>
        <div class="space-y-2">
          <Label for="confirm-password" class={confirmPasswordWarning ? "text-red-500" : ""}>Confirm Password</Label>
          <Input id="confirm-password" type="password" placeholder="Confirm your password" bind:value={confirmPassword} required />
          {#if confirmPasswordWarning}
            <p class="text-red-500 text-sm">{confirmPasswordWarning}</p>
          {/if}
        </div>
        <Button type="submit" class="w-full">Sign Up</Button>
      </form>
    </CardContent>
    <CardFooter class="text-center">
      <p>
        Already have an account? <a href="/login" class="text-blue-500">Log In</a>
      </p>
    </CardFooter>
  </Card>
</div>
