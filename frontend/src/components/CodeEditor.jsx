import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another

function CodeEditor({ urlName, setUrlName, isEditing }) {
    const [code, setCode] = React.useState(
        urlName
    );
    return (
        <Editor
            value={code}
            onValueChange={code => {setCode(code);setUrlName(code);}}
            highlight={code => highlight(code, languages.js)}
            padding={10}
            readOnly={!isEditing}
            className="min-w-26 w-fit max-w-[70%] text-lg border-none outline-none focus:border-none"
            maxLength={70}
        />
    );
}

export default CodeEditor;