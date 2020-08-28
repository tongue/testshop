<script context="module">
  import { query } from "@orgname/gql";
  const GET_CATEGORY = (category) => `
    {
      catalogue(path: "/${category}") {
        ...item
        ...product

        children {
          ...item
          ...product
        }
      }
    }

    fragment item on Item {
      name
      path
    }

    fragment product on Product {
      variants {
        isDefault
        images {
          ...image
        }
      }
    }

    fragment image on Image {
      variants {
        url
        width
      }
    }
  `;

  export async function preload({ params }) {
    const data = await query.call(this, GET_CATEGORY(params.category));
    return { data };
  }
</script>

<script>
  import Breadcrumbs from "../../components/Breadcrumbs.svelte";

  export let data;

  $: children = data.catalogue.children.map(({ variants, ...child }) => {
    const image = variants.find((variant) => variant.isDefault).images[0];
    return { ...child, image };
  });
</script>

<svelte:head>
  <title>Shop > Category</title>
</svelte:head>

<Breadcrumbs crumbs={[{ name: data.catalogue.name, path: data.catalogue.path }]} />
<h2>Category: {data.catalogue.name}</h2>
<ul class="grid">
{#each children as child}
  <li>
    <a href="{child.path}">
      <picture>
        <img src="{child.image.variants[4].url}" alt="{child.name}">
      </picture>
      <h3>{child.name}</h3>
    </a>
  </li>
{/each}
</ul>
