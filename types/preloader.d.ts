// types/preloader.types.ts

export interface PreloaderProps {
  /**
   * Duration of the preloader animation in seconds
   * @default 3
   */
  duration?: number;

  /**
   * Logo URL or path
   */
  logoSrc: string;

  /**
   * Alt text for the logo
   * @default "School Logo"
   */
  logoAlt?: string;

  /**
   * Callback function when preloader completes
   */
  onComplete?: () => void;

  /**
   * Custom className for the preloader container
   */
  className?: string;

  /**
   * Primary color for the loader
   * @default "#3B82F6"
   */
  primaryColor?: string;

  /**
   * Secondary color for the loader
   * @default "#1D4ED8"
   */
  secondaryColor?: string;
}

export interface LoaderProgressProps {
  progress: number;
  primaryColor?: string;
  secondaryColor?: string;
}

export interface LogoAnimationProps {
  logoSrc: string;
  logoAlt: string;
  isVisible: boolean;
}
