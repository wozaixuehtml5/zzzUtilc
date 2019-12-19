import React, { useLayoutEffect, useState, useRef } from 'react';
import { Tooltip } from 'antd';

export default (props) => {
    const [tooltip, setTooltip] = useState('');
    const textRef = useRef(null);

    useLayoutEffect(() => {
        const textLength = textRef.current.scrollWidth;
        const parentLength = textRef.current.offsetWidth; 

        if (textLength > parentLength) {
            setTooltip(props.title || props.children);
        }
    }, [props.title, props.children]);

    const extra = props.onBody
        ? {}
        : { getPopupContainer: (trigger) => trigger.parentNode};

    return (
        <Tooltip
            overlayStyle={{ wordBreak: 'break-all', whiteSpace: 'normal' }}
            title={props.hideTooltip ? '' : tooltip}
            placement={props.placement || 'top'}
            {...extra}
        >
            <div
                onClick={props.onClick}
                ref={textRef}
                style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    ...props.style,
                    maxWidth: props.width,
                }}
            >
                <span>{props.children}</span>
            </div>
        </Tooltip>
    );
};
