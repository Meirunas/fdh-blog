
import { defineConfig } from "tinacms";

const branch = process.env.HEAD || "main";

export default defineConfig({
  branch,
  clientId: process.env.TINACLIENTID,
  token: process.env.TINATOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "assets",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "src/posts",
        defaultItem: () => ({
          title: "New Post",
          layout: "../layouts/BlogPost.astro",
          added: new Date(),
          tags: [],
        }),
        ui: {
          dateFormat: "MMM DD YYYY",
          filename: {
            readonly: false,
            slugify: (values) => {
              return values?.slug?.toLowerCase().replace(/ /g, "-");
            },
          },
        },
        fields: [
          {
            name: "layout",
            label: "Layout",
            type: "string",
            required: true,
            searchable: false,
          },
          {
            name: "title",
            label: "Title",
            type: "string",
            isTitle: true,
            required: true,
          },
          {
            name: "slug",
            label: "Slug",
            type: "string",
            required: true,
          },
          {
            name: "description",
            label: "Description",
            type: "string",
            required: true,
          },
          {
            name: "tags",
            label: "Tags",
            type: "string",
            list: true,
            options: [
              { value: "technical", label: "Technical" },
              { value: "advice", label: "Advice" },
              { value: "events", label: "Events" },
              { value: "learning", label: "Learning" },
              { value: "meta", label: "Meta" },
              { value: "work", label: "Work" },
              { value: "personal", label: "Personal" },
              { value: "musings", label: "Musings" },
            ],
          },
          {
            name: "added",
            label: "Added",
            type: "datetime",
            dateFormat: "MMM DD YYYY",
            required: true,
          },
          {
            name: "updated",
            label: "Updated",
            type: "datetime",
            dateFormat: "MMM DD YYYY",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
  search: {
    tina: {
      indexerToken: process.env.TINASEARCH,
      stopwordLanguages: ["eng"],
    },
    indexBatchSize: 50,
    maxSearchIndexFieldLength: 100,
  },
});
