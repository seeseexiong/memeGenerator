import React, { Component } from 'react'

class MemeGenerator extends React.Component {
    constructor() {
        super()
        this.state = {
            topText: "",
            bottomText: "",
            randomImg: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const { memes } = response.data
                console.log(memes)
                this.setState({ allMemeImgs: memes })
            })
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    handleSubmit(event) {
        event.preventDefault()
        // get random int (index of allMemeImgs)
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        // get '.url' of that index
        const randMeme = this.state.allMemeImgs[randNum].url
        // set the randomImg to that '.url'
        this.setState({ randomImg: randMeme })

    }

    render() {
        return (
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="topText"
                        placeholder="top text"
                        value={this.state.topText}
                        onChange={this.handleChange}
                    />

                    <input
                        type="text"
                        name="bottomText"
                        placeholder="bottom text"
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                    />

                    <button>Gen</button>
                </form>

                <div className="meme">
                    <img src={this.state.randomImg} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}


export default MemeGenerator