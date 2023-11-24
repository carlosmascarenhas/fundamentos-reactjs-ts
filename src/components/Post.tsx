import {format, formatDistanceToNow} from "date-fns";
import {Comment} from "./Comment.tsx";
import {Avatar} from "./Avatar.tsx";
import {ChangeEvent, FormEvent, InvalidEvent, useState} from "react";
import ptBR from 'date-fns/locale/pt-BR';
import styles from './Post.module.css';

interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}

interface Content{
    type: string;
    content: string;
}

interface PostProps {
    author: Author;
    publishedAt: Date;
    content: Content[]
}

export function Post({author, publishedAt, content}: PostProps) {

    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR
    });

    const publishedDateRelativeNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true
    })

    const [newCommentText, setNewCommentText] = useState('');

    const [comments, setComment] = useState([
        'Post muito bacana, hein?!'
    ]);

    function handleCreateNewComment(e: FormEvent) {
        e.preventDefault();

        setComment([...comments, newCommentText]);
        setNewCommentText('');
    }

    function handleNewCommentChange(e: ChangeEvent<HTMLTextAreaElement>) {
        e.target.setCustomValidity('');
        setNewCommentText(e.target.value);
    }

    function handleNewCommentInvalid(e: InvalidEvent<HTMLTextAreaElement>) {
        e.target.setCustomValidity('Esse campo é obrigatório!');
    }

    function deleteComment(comment: string) {
        const commentsWithoutDeletedOne = comments.filter(value => {
            return value !== comment;
        })

        setComment(commentsWithoutDeletedOne);
    }

    const isNewCommentEmpty = newCommentText.length === 0;

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl}/>
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
                    {publishedDateRelativeNow}
                </time>
            </header>

            <div className={styles.content}>
                {
                    content.map(line => {
                        if (line.type === 'paragraph') {
                            return <p key={line.content}>{line.content}</p>
                        } else if (line.type === 'link') {
                            return <p key={line.content}><a href="#">{line.content}</a></p>
                        }
                    })
                }
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.comentForm}>
                <strong>Deixe seu feedback</strong>
                <textarea
                    placeholder="Deixe um comentário"
                    value={newCommentText}
                    onChange={handleNewCommentChange}
                    onInvalid={handleNewCommentInvalid}
                    required
                />
                <footer>
                    <button type="submit" disabled={isNewCommentEmpty}>Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {
                    comments.map(comment => {
                        return <Comment key={comment} content={comment} onDeleteComment={deleteComment}/>
                    })
                }
            </div>
        </article>
    )
}