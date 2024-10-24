import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import type { EditorState } from 'lexical';
import { $getRoot, TextNode } from 'lexical';
import React, { useMemo } from 'react';

import { isBrowser } from '@/utils/tools';

import { CustomTextNode } from './plugins/custom-text/node';
import {
  MentionNode,
  MentionNodePlugin,
  MentionNodePluginReplacement,
} from './plugins/mention-node';
import { MentionPickerPlugin, type MentionPickerPluginProps } from './plugins/mention-picker';
import OnBlurBlock from './plugins/on-blur-or-focus-block';
import { MentionsConfigProvider } from './provider';
import { useStyles } from './style';
import type { AutoSize, MentionsOptionsMap } from './types';
import { textToEditorState } from './utils';

export interface MentionsProps extends MentionPickerPluginProps {
  className?: string;
  wrapperClassname?: string;
  placeholder?: string;
  style?: React.CSSProperties;
  value?: string;
  defaultValue?: string;
  readOnly?: boolean;
  disabled?: boolean;
  onChange?: (text: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  variant?: 'outlined' | 'filled' | 'borderless';
  autoSize?: AutoSize;
}

export const Mentions: React.FC<MentionsProps> = ({
  className,
  wrapperClassname,
  placeholder,
  style,
  value,
  defaultValue,
  readOnly = false,
  disabled = false,
  onChange,
  onBlur,
  onFocus,
  variant = 'outlined',
  options = [],
  autoSize,
  triggers = ['@'],
  allowSpaces,
  punctuation,
  preTriggerChars,
  onSelect,
}) => {
  const { styles, cx } = useStyles({ autoSize });
  const editable = !readOnly && !disabled;
  const initialConfig = useMemo(
    () => ({
      namespace: 'mentions',
      nodes: [
        CustomTextNode,
        {
          replace: TextNode,
          with: (node: TextNode) => new CustomTextNode(node.__text),
        },
        MentionNode,
      ],
      editorState: textToEditorState(value || defaultValue || ''),
      onError: (error: Error) => {
        throw error;
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleEditorChange = (editorState: EditorState) => {
    const text = editorState.read(() => $getRoot().getTextContent());
    onChange?.(text.replaceAll('\n\n', '\n'));
  };

  // @Todo: set value when value change
  // useEffect(() => {
  //   //
  // }, [value])

  const optionsMap = useMemo(() => {
    return options.reduce((acc, option) => {
      acc[option.value] = option;
      return acc;
    }, {} as MentionsOptionsMap);
  }, [options]);

  if (!isBrowser) {
    return (
      <div className={cx(styles.wrapper, wrapperClassname)}>
        <div
          className={cx(
            {
              [styles.root]: true,
              [styles.filled]: variant === 'filled',
              [styles.borderless]: variant === 'borderless',
              [styles.disabled]: disabled,
            },
            className
          )}
          style={style || {}}
        />
        <div className={styles.placeholder}>
          {placeholder || `输入 ${triggers.join(' 或 ')} 插入引用`}
        </div>
      </div>
    );
  }

  return (
    <LexicalComposer initialConfig={{ ...initialConfig, editable }}>
      <MentionsConfigProvider value={{ optionsMap }}>
        <div className={cx(styles.wrapper, wrapperClassname)}>
          <RichTextPlugin
            ErrorBoundary={LexicalErrorBoundary}
            contentEditable={
              <ContentEditable
                className={cx(
                  {
                    [styles.root]: true,
                    [styles.filled]: variant === 'filled',
                    [styles.borderless]: variant === 'borderless',
                    [styles.disabled]: disabled,
                  },
                  className
                )}
                style={style || {}}
              />
            }
            placeholder={
              <div className={styles.placeholder}>
                {placeholder || `输入 ${triggers.join(' 或 ')} 插入引用`}
              </div>
            }
          />
          <MentionPickerPlugin
            allowSpaces={allowSpaces}
            onSelect={onSelect}
            options={options}
            preTriggerChars={preTriggerChars}
            punctuation={punctuation}
            triggers={triggers}
          />
          <MentionNodePlugin />
          <MentionNodePluginReplacement />
          <HistoryPlugin />
          <OnChangePlugin onChange={handleEditorChange} />
          <OnBlurBlock onBlur={onBlur} onFocus={onFocus} />
        </div>
      </MentionsConfigProvider>
    </LexicalComposer>
  );
};
