import type { FlashListProps as OriginalFlashListProps } from "@shopify/flash-list";

declare module "@shopify/flash-list" {
  interface FlashListProps<TItem> extends OriginalFlashListProps<TItem> {
    /**
     * Estimated height of each item in the list, used for virtualization.
     * This prop exists at runtime but is currently missing from the
     * bundled type definitions, so we augment it here.
     */
    estimatedItemSize?: number;
  }
}
