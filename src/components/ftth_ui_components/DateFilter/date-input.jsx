import { DateInput as AriaDateInput, DateSegment as AriaDateSegment } from "react-aria-components";

export const DateInput = (props) => {
    return (
        <AriaDateInput
            {...props}
            className={`flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm transition-colors focus-within:border-primary1 focus-within:ring-2 focus-within:ring-primary1/12 ${props.className || ''}`}
        >
            {(segment) => (
                <AriaDateSegment
                    segment={segment}
                    className={`
                        rounded px-0.5 tabular-nums caret-transparent outline-none
                        transition-colors duration-100 focus:bg-primary1 focus:font-medium focus:text-white
                        ${segment.isPlaceholder ? 'text-gray-400 italic' : 'text-gray-700 dark:text-white'}
                        ${segment.type === "literal" ? 'text-gray-500 dark:text-white' : ''}
                    `}
                />
            )}
        </AriaDateInput>
    );
};