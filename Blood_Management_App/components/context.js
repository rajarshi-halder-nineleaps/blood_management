import React from 'react';

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
    state={
        email:'',
        password:'',
    }

    setEmail = (email) => {
        this.setState({email});
    }

    
    setPassword = (password) => {
        this.setState({password});
    }

    render() {
        return (
            <AuthContext.Provider
            value={{
                email:this.state.name,
                gender:this.state.password,
                setEmail: this.setEmail,
                setPassword: this.setPassword
            }}
            >

                {this.props.children}
            </AuthContext.Provider>

        )
    }
} 

export {AuthProvider, AuthContext} ;