import React, { Component } from 'react';

class HeaderComponent extends Component {
    render() {
        return (
            <div>
                <header className="header">
                    <nav>
                        <div>
                            <a href="https://www.capgemini.com/" title="Go to Capgemini">
                                <img src="https://prod.ucwe.capgemini.com/wp-content/themes/capgemini2020/assets/images/logo.svg" width="297" height="58" alt="Capgemini company logo" />
                            </a>

                        </div>

                    </nav>

                </header>
            </div>
        );
    }
}

export default HeaderComponent;