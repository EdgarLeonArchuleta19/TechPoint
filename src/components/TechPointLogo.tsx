import React from 'react';

interface TechPointLogoProps {
  className?: string;
  variant?: 'default' | 'light' | 'icon-only' | 'stacked';
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
  showSubtitle = true,
  subtitleText = "SOLUCIONES TECNOLÓGICAS",
}) => {
  if (variant === 'icon-only') {
    return <TechPointIcon className={className} />;
  }

  if (variant === 'stacked') {
    const stackedSizes = {
      sm: "w-28 sm:w-32",
      md: "w-36 sm:w-44",
      lg: "w-44 sm:w-56",
      xl: "w-52 sm:w-64",
    };
    return (
      <img
        src={`${baseUrl}logo-techpoint.png`}
        alt="TECHPOINT — Soluciones Tecnológicas"
        className={`object-contain select-none ${stackedSizes[size]} ${className}`}
      />
    );
  }

  const iconSizes = {
    sm: "w-8 h-8 sm:w-9 sm:h-9",
    md: "w-10 h-10 sm:w-11 sm:h-11",
    lg: "w-12 h-12 sm:w-14 sm:h-14",
    xl: "w-14 h-14 sm:w-16 sm:h-16",
  };

  const wordmarkHeights = {
    sm: "h-4 sm:h-[18px]",
    md: "h-5 sm:h-6",
    lg: "h-6 sm:h-7",
    xl: "h-7 sm:h-8",
  };

  const subtitleSizes = {
    sm: "text-[6.5px] sm:text-[7.5px] tracking-[0.18em] sm:tracking-[0.22em]",
    md: "text-[7.5px] sm:text-[8.5px] tracking-[0.22em] sm:tracking-[0.26em]",
    lg: "text-[9px] sm:text-[10px] tracking-[0.26em]",
    xl: "text-[10px] sm:text-[12px] tracking-[0.3em]",
  };

  const subtitleColor = variant === 'light' ? 'text-blue-200/80' : 'text-[#0B1D3A]';

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
            className={`font-medium uppercase font-sans mt-0.5 leading-none whitespace-nowrap ${subtitleSizes[size]} ${subtitleColor}`}
          >
            {subtitleText}
          </span>
        )}
      </div>
    </div>
  );
};

export default TechPointLogo;
