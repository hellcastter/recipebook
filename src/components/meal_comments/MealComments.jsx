import {useContext, useState} from "react";
import {Link} from "react-router-dom";
import useSWR from "swr";
import PropTypes from "prop-types";

import {UserContext} from "../../contexts.js";

import userAvatar from "../../assets/user.svg";

import "./MealComments.css";

const MealComments = ({id}) => {
    const {user} = useContext(UserContext);
    const [comment, setComment] = useState("");

    const {
        data: comments = [],
        isLoading,
        isValidating,
        mutate
    } = useSWR(`http://localhost:3001/comments?post_id=${id}&_sort=-date`, async (url) => {
        const response = await fetch(url);
        return response.json();
    });

    const onSubmit = async (event) => {
        event.preventDefault();

        await fetch("http://localhost:3001/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                post_id: id,
                username: user.username,
                date: new Date().toISOString(),
                comment
            })
        });

        setComment("");

        // Refresh the comments
        await mutate(`http://localhost:3001/comments?post_id=${id}&_sort=-date`);
    };

    return (
        <>
            {
                user ?
                    <form onSubmit={onSubmit}>
                        <textarea
                            placeholder="Leave a comment" className="meal__textarea" value={comment}
                            onChange={({target}) => setComment(target.value)}/>
                        <button type="submit" className="meal__submit">Submit</button>
                    </form> :
                    <p>
                        <Link to="/Login" className="meal__comment-leave">Login</Link> to leave a comment
                    </p>
            }

            {
                (isLoading || isValidating) ?
                    <div>Loading...</div> :
                    <ul className="meals__comments-list">
                        {
                            comments.map((comment) => (
                                <li key={comment.id}>
                                    <div className="comment__author">
                                        <img src={userAvatar} alt={comment.username} width={30}/>

                                        <div>
                                            <strong>{comment.username}</strong>
                                            <time dateTime="comment.date">
                                                {new Date(comment.date).toLocaleString()}
                                            </time>
                                        </div>
                                    </div>

                                    <p className="meal__comment">{comment.comment}</p>
                                </li>
                            ))
                        }
                    </ul>
            }
        </>
    );
};

MealComments.propTypes = {
    id: PropTypes.string.isRequired
}

export default MealComments;