
import css from "./GitHubApp.module.css";
import { Form, Formik, Field } from "formik";
import { useState } from "react";
import { fetchUser } from "../../api";




export default function GitHubApp() {
    const [loading, setloading] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false)

    const handleSearch = async (values, actions) => {
        try {
        setloading(true);
            setUser(null);
            setError(false);
        const fetchedUser = await fetchUser(values.username);
        setUser(fetchedUser);
        
        actions.resetForm();
        } catch {
            setError(true);
        } finally {
            setloading(false);
        }
     };


    return (
        <div className={css.container}>
            <h1>HTTP reguests in React</h1>
            <Formik initialValues={{ username: "" }} onSubmit={handleSearch}>
                <Form>
                    <Field name="username" type="text" />
                    <button type="submit">Search</button>
                </Form>
            </Formik>

            {loading && <b>Loading user data,please wait...</b>}
            { error && <b>Oops there was an error, please try again</b>}
            {user && (
                <div>
                    <img src={user.avatar_url} alt={user.name} width="180" />
                    <a href={user.html_url}>{user.name}</a>
                    <p>Followers: {user.followers}</p>
                    <p>{user.bio}</p>
            </div>
            )}
        </div>
    )
}