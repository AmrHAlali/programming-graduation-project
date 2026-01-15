import React, { useLayoutEffect, useState } from "react";
import { Platform, Image as RNImage, ImageSourcePropType } from "react-native";
import {
  Image as ExpoImage,
  ImageStyle,
  ImageProps as ExpoImageProps,
} from "expo-image";

// Base types for all images
interface BaseImageProps extends Omit<ExpoImageProps, "source"> {
  style?: ImageStyle;
  maxWidth?: number;
  maxHeight?: number;
}

// Props for local images
interface LocalImageProps extends BaseImageProps {
  source: ImageSourcePropType;
}

// Props for remote images
interface RemoteImageProps extends BaseImageProps {
  source: string | { uri: string };
}

// Hook for calculating image dimensions
export function useAutoImage(
  remoteUri: string,
  dimensions?: [maxWidth?: number, maxHeight?: number]
): [width: number, height: number] {
  const [[remoteWidth, remoteHeight], setRemoteImageDimensions] = useState([
    0, 0,
  ]);
  const remoteAspectRatio = remoteWidth / remoteHeight;
  const [maxWidth, maxHeight] = dimensions ?? [];

  useLayoutEffect(() => {
    if (!remoteUri) return;
    RNImage.getSize(remoteUri, (w, h) => setRemoteImageDimensions([w, h]));
  }, [remoteUri]);

  if (Number.isNaN(remoteAspectRatio)) return [0, 0];

  if (maxWidth && maxHeight) {
    const aspectRatio = Math.min(
      maxWidth / remoteWidth,
      maxHeight / remoteHeight
    );
    return [remoteWidth * aspectRatio, remoteHeight * aspectRatio];
  } else if (maxWidth) {
    return [maxWidth, maxWidth / remoteAspectRatio];
  } else if (maxHeight) {
    return [maxHeight * remoteAspectRatio, maxHeight];
  } else {
    return [remoteWidth, remoteHeight];
  }
}

// Default blur hash placeholder
const DEFAULT_BLUR_HASH = "L6PZfSi_.AyE_3t7t7R**0o#DgR4";

// Component for local images
export const LocalImage = ({
  source,
  style,
  placeholder = DEFAULT_BLUR_HASH,
  ...props
}: LocalImageProps) => {
  return (
    <ExpoImage
      source={source}
      placeholder={placeholder}
      style={style}
      {...props}
    />
  );
};

// Component for remote images with auto-scaling
export const RemoteImage = ({
  source,
  style,
  maxWidth,
  maxHeight,
  placeholder = DEFAULT_BLUR_HASH,
  ...props
}: RemoteImageProps) => {
  const uri = typeof source === "string" ? source : source.uri;
  const [width, height] = useAutoImage(
    Platform.select({
      web: uri,
      default: uri,
    }),
    [maxWidth, maxHeight]
  );

  return (
    <ExpoImage
      source={{ uri }}
      placeholder={placeholder}
      style={[{ width, height }, style]}
      {...props}
    />
  );
};

// Utility function to preload images
export const preloadImages = (sources: string[]) => {
  ExpoImage.prefetch(sources);
};

// Main Image component that determines which specific component to use
export type ImageProps = LocalImageProps | RemoteImageProps;

export const Image = ({
  source,
  maxWidth,
  maxHeight,
  placeholder = DEFAULT_BLUR_HASH,
  ...props
}: ImageProps) => {
  // Helper function to determine if the source is remote
  const isRemoteSource = (
    source: ImageProps["source"]
  ): source is RemoteImageProps["source"] =>
    typeof source === "string" ||
    (typeof source === "object" && "uri" in source);

  if (isRemoteSource(source)) {
    // Remote image
    return (
      <RemoteImage
        source={source}
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        placeholder={placeholder}
        {...props}
      />
    );
  }

  // Local image
  return <LocalImage source={source} placeholder={placeholder} {...props} />;
};
