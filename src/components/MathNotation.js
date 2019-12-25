import React, {Component} from "react";
import MathJax from 'react-mathjax'

class MathNotation extends Component {
    render() {
        const {text, inline} = this.props;
        return (
            <span>
                {
                    inline && (
                        <MathJax.Provider>
                            <MathJax.Node inline formula={text}/>
                        </MathJax.Provider>
                    )
                }
                {!inline &&
                <p>
                    <MathJax.Provider>
                        <div>
                            <MathJax.Node formula={text}/>
                        </div>
                    </MathJax.Provider>
                </p>
                }
            </span>


        );
    }
}

export default MathNotation
