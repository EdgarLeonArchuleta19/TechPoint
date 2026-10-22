import React from 'react';

interface TechPointLogoProps {
  className?: string;
  variant?: 'default' | 'light' | 'icon-only';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  subtitleText?: string;
}

const baseUrl = import.meta.env.BASE_URL;

export const TechPointIcon: React.FC<{ className?: string; size?: number }> = ({
  className = "w-9 h-9",
  size,
}) => {
  return (
    <img
      src={`${baseUrl}logo-icon.png`}
      alt="TECHPOINT Icon"
      className={`object-contain select-none ${className}`}
      style={size ? { width: size, height: size } : undefined}
    />
  );
};

export const TechPointLogo: React.FC<TechPointLogoProps> = ({
  className = "",
  variant = 'default',
  size = 'md',
  showSubtitle = false,
  subtitleText = "SOLUCIONES TECNOLÓGICAS",
}) => {
  if (variant === 'icon-only') {
    return <TechPointIcon className={className} />;
  }

  const iconSizes = {
    sm: "w-7 h-7 sm:w-8 sm:h-8",
    md: "w-9 h-9 sm:w-10 sm:h-10",
    lg: "w-11 h-11 sm:w-12 sm:h-12",
    xl: "w-14 h-14 sm:w-16 sm:h-16",
  };

  const wordmarkHeights = {
    sm: "h-4 sm:h-[18px]",
    md: "h-5 sm:h-[22px]",
    lg: "h-6 sm:h-7",
    xl: "h-7 sm:h-8",
  };

  const subtitleSizes = {
    sm: "text-[6.5px] sm:text-[7.5px] tracking-[0.18em] sm:tracking-[0.22em]",
    md: "text-[7.5px] sm:text-[8.5px] tracking-[0.22em] sm:tracking-[0.26em]",
    lg: "text-[9px] sm:text-[10px] tracking-[0.26em]",
    xl: "text-[10px] sm:text-[12px] tracking-[0.3em]",
  };

  const subtitleColor = variant === 'light' ? 'text-blue-200/80' : 'text-[#86868B]';

  return (
    <div className={`inline-flex items-center gap-2 sm:gap-2.5 select-none ${className}`}>
      <img
        src={`${baseUrl}logo-icon.png`}
        alt="TECHPOINT Símbolo"
        className={`object-contain shrink-0 ${iconSizes[size]}`}
      />

      <div className="flex flex-col justify-center">
        <img
          src={`${baseUrl}logo-wordmark.png`}
          alt="TECHPOINT"
          className={`object-contain object-left ${wordmarkHeights[size]}`}
        />
        {showSubtitle && (
          <span
            className={`font-semibold uppercase font-sans mt-1 leading-none whitespace-nowrap ${subtitleSizes[size]} ${subtitleColor}`}
          >
            {subtitleText}
          </span>
        )}
      </div>
    </div>
  );
};

export default TechPointLogo;
