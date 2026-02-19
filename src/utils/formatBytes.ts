type FormatBytesOptions = {
  unknownWhenZero?: boolean;
  unknownLabel?: string;
};

export const formatBytes = (
  bytes: number,
  options: FormatBytesOptions = {},
): string => {
  const { unknownWhenZero = false, unknownLabel = "Unknown size" } = options;

  if (!Number.isFinite(bytes)) {
    return unknownLabel;
  }

  const value = Math.max(0, bytes);

  if (unknownWhenZero && value <= 0) {
    return unknownLabel;
  }

  if (value >= 1024 ** 4) {
    return `${(value / 1024 ** 4).toFixed(2)} TB`;
  }

  if (value >= 1024 ** 3) {
    return `${(value / 1024 ** 3).toFixed(2)} GB`;
  }

  if (value >= 1024 ** 2) {
    return `${(value / 1024 ** 2).toFixed(2)} MB`;
  }

  if (value >= 1024) {
    return `${(value / 1024).toFixed(2)} KB`;
  }

  return `${Math.trunc(value)} B`;
};
