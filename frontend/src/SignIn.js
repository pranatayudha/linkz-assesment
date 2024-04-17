import React from "react";

const SignIn = () => {
    return (
        <div className="container">
            <h2>Sign In</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="email">Email address:</label>
                    <input type="email" className="form-control" id="email" />
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Password:</label>
                    <input type="password" className="form-control" id="pwd" />
                </div>
                <button type="submit" className="btn btn-primary">
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default SignIn;
