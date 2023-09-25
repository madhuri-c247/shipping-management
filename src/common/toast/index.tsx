// import React, { SyntheticEvent, useEffect, useRef } from 'react';

// import styles from './toast.module.scss';

// const TOAST_TIME_MS = 4500 as const;

// interface ToastProperties {
//     timer?: number;

//     label: string;
// }

// const Toast: React.FC<ToastProperties> = (props) => {
//     const toast = useRef<HTMLOutputElement>(null);
//     let timer: number = -1;

//     const onReset = () => {
//         window.clearTimeout(timer);
//     }

//     const onStart = () => {
//         timer = window.setTimeout(HideToast, props.timer);
//     }

//     const onClose = (event: SyntheticEvent | null) => {
//         if (event) event.preventDefault();

//         HideToast();
//     }

//     useEffect(() => {
//         onStart();
//         toast.current?.focus();

//         return () => {
//             onClose(null);
//         };
//     });
    
//     return (
//         <output
//             aria-labelledby="toast-label"
//             onMouseLeave={onStart}
//             onMouseEnter={onReset}
//             className="toast"
//             ref={toast}
//         >
//             <p id="toast-label">
//                 {props.label}
//             </p>
//             <button type="button" onClick={onClose} aria-label="Close dialog" className="modal-close no-button">
//               x
//             </button>
//         </output>
//     );
// };

// Toast.defaultProps = {
//     timer: TOAST_TIME_MS
// };