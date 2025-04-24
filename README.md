# Hautechai Widgets

## Overview

Hautechai Widgets is a React-based UI component library that provides an easy way to integrate Hautechai's AI-powered fashion image generation capabilities into your web applications. The widget wraps the Hautechai SDK and provides a user-friendly interface for generating, viewing, and managing AI-generated fashion images.

## Features

- Generate high-quality fashion images using AI models
- Support for multiple AI models (Linda and Naomi)
- Customizable UI with configurable buttons
- Easy integration with any web application
- Built-in image management and viewing capabilities

## Installation

```bash
# Using npm
npm install @hautechai/widgets

# Using yarn
yarn add @hautechai/widgets

# Using pnpm
pnpm add @hautechai/widgets
```

## Requirements

- React 18 or higher
- A valid Hautechai API token

## Basic Usage

```typescript
import { init } from '@hautechai/widgets';

// Initialize the widget in a DOM element
const widget = init(document.getElementById("widget")!, {
  handlers: {
    // Required: Function to provide authentication token
    onGetAuthToken: async () => "YOUR_HAUTECHAI_API_TOKEN",

    // Optional: Handler for when an image is downloaded
    onDownloadImage: async ({ imageId }, sdk) => {
      const image = await sdk.images.get({ id: imageId });
      console.log(image?.url);
      // You can save the image or display it elsewhere in your application
    },
  },
  props: {
    // Collection ID for organizing generated images
    collectionId: "your-collection-id",

    // Configuration for the AI model
    input: {
      model: "linda",
      productImageId: "your-product-image-id",
      prompt: "A detailed description of the desired output",
      seed: 42,
      aspectRatio: "1:1",
    },
  },
});

// Start the generation process
widget.start();

// Update widget properties
widget.setProps({
  input: {
    model: "linda",
    productImageId: "your-product-image-id",
    prompt: "Updated description",
    seed: 42,
    aspectRatio: "1:1",
  },
});

// Get generated images
const images = await widget.getImages();
```

## Models

The widget supports two AI models for image generation:

### Linda Model

The Linda model generates fashion images based on a product image, prompt, and other parameters.

```typescript
input: {
  model: "linda",
  productImageId: "your-product-image-id", // ID of the product image
  prompt: "A detailed description",        // Text prompt for generation
  aspectRatio: "1:1",                      // Aspect ratio of the output image
  seed: 42,                                // Seed for reproducible results
  enhance: true,                           // Optional: Enhance the output image
}
```

### Naomi Model

The Naomi model generates fashion images with more control over pose and garment placement.

```typescript
input: {
  model: "naomi",
  productImageId: "your-product-image-id", // ID of the product image
  category: "top",                         // Category of the product (e.g., "top", "dress")
  prompt: "A detailed description",        // Text prompt for generation
  seed: 42,                                // Seed for reproducible results
  poseId: "your-pose-id",                  // ID of the pose to use
  enhance: true,                           // Optional: Enhance the output image
}
```

## Button Customization

The widget provides customizable buttons that can be configured to match your application's UI requirements. You can customize the text displayed on each button and control their visibility.

### Available Buttons

The widget supports the following buttons:

- **download**: Button for downloading generated images
- **retouch**: Button for enhancing or retouching images
- **upscale**: Button for upscaling image resolution

### Button Configuration Options

Each button can be configured with the following properties:

- **text**: Custom text to display on the button
- **visible**: Boolean flag to show or hide the button

### Example

```typescript
// Initialize widget with custom button configuration
const widget = init(document.getElementById("widget")!, {
  handlers: {
    onGetAuthToken: async () => "YOUR_HAUTECHAI_API_TOKEN",
    onDownloadImage: async ({ imageId }, sdk) => {
      // Handle download
    },
  },
  props: {
    input: {
      model: "linda",
      productImageId: "your-product-image-id",
      prompt: "A detailed description",
      seed: 42,
      aspectRatio: "1:1",
    },
    // Button customization
    buttons: {
      download: { 
        text: "Save Image", // Custom button text
        visible: true       // Show the button
      },
      retouch: { 
        text: "Enhance",    // Custom button text
        visible: true       // Show the button
      },
      upscale: { 
        visible: false      // Hide the button
      },
    },
  },
});
```

## Notes

- Image generation may take up to 3 minutes depending on the complexity of the request
- For best results, use high-quality product images and detailed prompts
