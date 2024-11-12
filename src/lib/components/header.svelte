<header class="bg-background p-4 text-foreground shadow-md">
    <div class="container mx-auto flex items-center justify-between">
        <div class="flex items-center">
            <a href="/">
                <img src={favicon} alt="Logo" class="mr-2 h-12 w-auto" />
            </a>
            <div class="flex space-x-4">
                <a href="/groups">Groups</a>
                <a href="/locationSearchView">Locations</a>
            </div>
        </div>
        <div class="space-x-2">
            <!-- {#if isLoggedIn} -->
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant="ghost" size="icon">
                        <User class="h-5 w-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem><a href="/dashboard">Dashboard</a></DropdownMenuItem>
                    <DropdownMenuItem>
                        <a href="/profile">Profile</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <!-- {:else} -->
            <Button variant="outline" href="/login">Login</Button>
            <Button href="/signup">Sign Up</Button>
            <!-- {/if} -->
        </div>
    </div>
</header>