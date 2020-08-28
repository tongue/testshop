<script context="module">
  import { query } from "@orgname/gql";
  const GET_ALL = `
    {
      catalogue(language: "en", path: "/") {
        children {
          ...item
        }
      }
    }

    fragment item on Item {
      name
      path
      components(ids: "image") {
        content {
          ...imageContent
        }
      }
    }

    fragment image on Image {
      url
      variants {
        url
        width
      }
    }

    fragment imageContent on ImageContent {
      images { ...image }
    }
  `;

  export async function preload() {
    const data = await query.call(this, GET_ALL);
    return { data };
  }
</script>

<script>
  export let data;

  $: categories = data.catalogue.children.map(({ components, ...category }) => {
    const image = components.find((component) => component.content.images.length).content.images[0];
    return { ...category, image }
  });
</script>

<svelte:head>
  <title>Shop</title>
</svelte:head>

<ul class="grid">
{#each categories as category}
  <li>
    <a href="{category.path}">
      <picture>
        <img src="{category.image.variants[4].url}" alt="{category.name}">
      </picture>
      <h2>{category.name}</h2>
    </a>
  </li>
{/each}
</ul>
