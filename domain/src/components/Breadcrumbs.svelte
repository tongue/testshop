<script>
  export let crumbs;
</script>

<ul>
  <li><a href="/">Shop</a></li>
  {#each crumbs as crumb}
    <li><a href="{crumb.path}">{crumb.name}</a></li>
  {/each}
</ul>
