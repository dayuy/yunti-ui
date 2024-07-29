import { createStyles, keyframes } from 'antd-style';

/**
 * styles from https://github.com/alibaba/lowcode-plugins/blob/main/packages/base-monaco-editor/src/index.scss
 */
export const useStyles = createStyles(
  (
    { css, token, prefixCls },
    {
      minimapEnabled = false,
      isFullScreen = false,
      diff = false,
    }: { minimapEnabled?: boolean; isFullScreen?: boolean; diff?: boolean }
  ) => {
    const dots = keyframes`
      0% { content: '.'; }
      20% { content: '..'; }
      40% { content: '...'; }
      60% { content: '....'; }
      80% { content: '.....'; }
    `;

    return {
      base: css`
        position: relative;

        box-sizing: content-box;
        min-height: 100px;

        border: 1px solid transparent;
        border-radius: 3px;
        &:hover {
          border-color: var(--color-field-border-hover, rgba(31, 56, 88, 0.1));
        }

        &.ve-focused {
          border-color: var(--color-field-border-active, rgba(31, 56, 88, 0.15));
        }

        &.ve-outline {
          border: 1px solid var(--color-field-border, rgba(31, 56, 88, 0.05)) !important;
        }

        & > .react-monaco-editor-container {
          width: 100%;
          height: 100%;
          min-height: 100px;
          background: transparent;

          ${isFullScreen &&
          css`
            position: fixed;
            z-index: 9998;
            inset: 0;

            width: auto !important;
            height: auto !important;
          `}

          & > .monaco-editor {
            border-radius: ${token.borderRadius}px;
            .overflow-guard,
            .margin {
              border-top-left-radius: ${token.borderRadius}px;
              border-bottom-left-radius: ${token.borderRadius}px;
            }
            .monaco-scrollable-element {
              border-top-right-radius: ${token.borderRadius}px;
              border-bottom-right-radius: ${token.borderRadius}px;
            }
          }
          .monaco-diff-editor {
            border-radius: ${token.borderRadius}px;
            & > .original > .monaco-editor {
              border-top-left-radius: ${token.borderRadius}px;
              border-bottom-left-radius: ${token.borderRadius}px;
              .overflow-guard,
              .margin {
                border-top-left-radius: ${token.borderRadius}px;
                border-bottom-left-radius: ${token.borderRadius}px;
              }
            }
            .diffViewport {
              border-top-right-radius: ${token.borderRadius - 1}px;
              border-bottom-right-radius: ${token.borderRadius - 1}px;
            }
          }
        }

        ..syntaxTips {
          position: absolute;
          bottom: 0;
          left: 0;

          box-sizing: border-box;
          width: 100%;
          max-height: 0;
          margin: 0;
          padding: 10px 30px;

          color: red;

          background: rgba(255, 234, 234, 0.8);

          transition: 0.2s ease max-height;
        }

        .syntaxTips:hover {
          overflow: auto;
          max-height: 50%;
        }

        .syntaxTips .infoIcon {
          position: absolute;
          top: 2px;
          right: 5px;
          transform: rotateY(180deg);

          width: 20px;
          height: 16px;
        }
      `,
      fullScreenBtn: css`
        &.${prefixCls}-btn {
          position: absolute;
          color: ${token.colorTextSecondary};
          top: 20px;
          transition: none;
          ${isFullScreen
            ? css`
                z-index: 9999;
                right: ${diff ? 64 : 138}px;
              `
            : css`
                right: ${minimapEnabled || diff ? 64 : 20}px;
              `}
        }
      `,
      loading: css`
        position: absolute;
        inset: 0;

        display: flex;
        align-items: center;
        justify-content: center;

        font-size: ${token.fontSizeSM}px;
        color: ${token.colorTextTertiary};

        background-color: transparent;

        &::after {
          content: '';
          /* width: 20px; */
          display: inline;
          animation: ${dots} steps(3) 1s infinite;
        }
      `,
    };
  },
  { hashPriority: 'low' }
);
