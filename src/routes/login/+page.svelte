<script lang="ts">
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { onMount } from "svelte";
  import { gsap } from "gsap";

  let email = "";
  let password = "";
  let emailWarning = ""; // Warning message for invalid email

  function handleLogin() {
    if (isValidEmail(email)) {
      console.log("Login successful:", { email, password });
      history.back(); // Navigate back on valid email
    } else {
      emailWarning = "Please enter a valid email address.";
    }
  }

  function isValidEmail(email:string) {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

<div class="flex items-center justify-center min-h-screen">
  <Card class="w-[350px] card">
    <CardHeader>
      <CardTitle>Login</CardTitle>
      <CardDescription>Enter your credentials to access your account.</CardDescription>
    </CardHeader>
    <CardContent>
      <form on:submit|preventDefault={handleLogin} class="space-y-4">
        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Your email"
            bind:value={email}
            class={emailWarning ? "border-red-500" : ""}
            required
          />
          {#if emailWarning}
            <p class="text-red-500 text-sm">{emailWarning}</p>
          {/if}
        </div>
        <div class="space-y-2">
          <Label for="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Your password"
            bind:value={password}
            required
          />
        </div>
      </form>
    </CardContent>
    <CardFooter class="flex justify-between">
      <Button variant="outline" on:click={() => history.back()}>Cancel</Button>
      <Button type="submit" on:click={handleLogin}>Login</Button>
    </CardFooter>
  </Card>
</div>
