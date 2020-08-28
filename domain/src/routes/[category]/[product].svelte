<script context="module">
  import { query } from "@orgname/gql";
  const GET_PRODUCT = (category, product) => `
    {
      catalogue(path: "/${category}/${product}") {
        ... on Product {
          ...product
        }
      }
    }

    fragment component on Component {
      name
      type
      path
      meta {
        key
        value
      }
      content {
        ...singleLine
        ...richText
        ...imageContent
        ...paragraphCollection
        ...itemRelations
        ...gridRelations
        ...location
        ...propertiesTable
        ...dateTime
      }
    }

    fragment dateTime on DatetimeContent {
      datetime
    }

    fragment gridRelations on GridRelationsContent {
      grids {
        id
        name
      }
    }

    fragment imageContent on ImageContent {
      images {
        ...image
      }
    }

    fragment image on Image {
      url
      altText
      key
      variants {
        url
        width
        key
      }
    }

    fragment itemRelations on ItemRelationsContent {
      items {
        id
        name
        path
      }
    }

    fragment location on LocationContent {
      lat
      long
    }

    fragment paragraphCollection on ParagraphCollectionContent {
      paragraphs {
        title {
          ...singleLine
        }
        body {
          ...richText
        }
        images {
          ...image
        }
      }
    }

    fragment product on Product {
      id
      name

      components {
        ...component
      }

      variants {
        id
        name
        sku
        price
        stock
        isDefault
        images {
          url
          altText
          key

          variants {
            key
            width
            url
          }
        }

        subscriptionPlans {
          id
          name
          initialPeriod
          initialPrice
          recurringPeriod
          recurringPrice
        }
      }

      vatType {
        name
        percent
      }
    }

    fragment propertiesTable on PropertiesTableContent {
      sections {
        ... on PropertiesTableSection {
          title
          properties {
            key
            value
          }
        }
      }
    }

    fragment richText on RichTextContent {
      json
      html
      plainText
    }

    fragment singleLine on SingleLineContent {
      text
    }
  `;

  const GET_CATEGORY = (category) => `
    {
      catalogue(path: "/${category}") {
        path
        name
      }
    }
  `;
  export async function preload({ params }) {
    const data = await query.call(this, GET_PRODUCT(params.category, params.product));
    const parentData = await query.call(this, GET_CATEGORY(params.category));
    return { data, parentData };
  }
</script>

<script>
  import Breadcrumbs from "../../components/Breadcrumbs.svelte";
  export let data;
  export let parentData;

  $: images = data.catalogue.variants.find((variant) => variant.isDefault).images[0];
  $: summary = data.catalogue.components.find((component) => component.name = "Summary").content;
  console.log(data);
  console.log(parentData);
</script>

<svelte:head>
  <title>Shop > Category > Product</title>
</svelte:head>

<Breadcrumbs crumbs={[{ name: parentData.catalogue.name, path: parentData.catalogue.path }, { name: data.catalogue.name, path: data.catalogue.path }]} />
<article>
  <picture>
    <img src="{images.variants[8].url}" alt="{data.catalogue.name}">
  </picture>

  <h2>{data.catalogue.name}</h2>

  <div>
    {@html summary.html}
  </div>
</article>

<style>
  article {
    display: grid;
    grid-template-rows: 350px auto;
  }

  picture {
    overflow: hidden;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
</style>
