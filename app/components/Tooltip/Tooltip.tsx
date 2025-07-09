"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type TooltipProps = {
    children: React.ReactNode;
    content: React.ReactNode;
};

export const Tooltip = ({ children, content }: TooltipProps) => {
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipContainer = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const el = document.createElement("div");
        document.body.appendChild(el);
        tooltipContainer.current = el;
        setMounted(true);

        return () => {
            document.body.removeChild(el);
        };
    }, []);

    const showTooltip = () => {
        const rect = triggerRef.current?.getBoundingClientRect();
        if (rect) {
            setCoords({
                top: rect.top + window.scrollY - 75, 
                left: rect.left + window.scrollX + rect.width / 2,
            });
            setVisible(true);
        }
    };

    const hideTooltip = () => setVisible(false);

    const tooltipEl = visible && mounted && tooltipContainer.current
        ? createPortal(
            <div
                className="fixed z-50 p-3 text-sm bg-blackButtonBackground border border-gray rounded shadow text-center"
                style={{
                    top: coords.top,
                    left: coords.left,
                    transform: "translateX(-50%)",
                }}
            >
                {content}
            </div>,
            tooltipContainer.current
        )
        : null;

    return (
        <>
            <div
                ref={triggerRef}
                onMouseEnter={showTooltip}
                onMouseLeave={hideTooltip}
                className="inline-block"
            >
                {children}
            </div>
            {tooltipEl}
        </>
    );
};