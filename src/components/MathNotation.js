import React, {Component} from "react";
import MathJax from 'react-mathjax'

class MathNotation extends Component {
    render() {
        const {text,inline} = this.props;
        return (
            <div>
                {
                    inline && (
                        <MathJax.Provider>
                            <div>
                                <MathJax.Node inline formula={text} />
                            </div>
                        </MathJax.Provider>
                    )
                }
                {!inline  &&
                <p>
                    <MathJax.Provider>
                        <div>
                            <MathJax.Node formula={text} />
                        </div>
                    </MathJax.Provider>
                </p>
                }
            </div>



        );
    }
}
export default MathNotation