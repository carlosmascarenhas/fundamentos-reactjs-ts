import {Post} from "./components/Post.tsx";
import {Header} from "./components/Header.tsx";
import {Sidebar} from "./components/Sidebar.tsx";
import './global.css';
import styles from './App.module.css';

const posts = [
    {
        id: 1,
        author: {
            avatarUrl: 'https://github.com/diego3g.png',
            name: 'Diego Fernandes',
            role: 'CTO @Rocketseat',
        },
        contents: [
            {
                type: 'paragraph',
                content: 'Fala galeraa 👋'
            },
            {
                type: 'paragraph',
                content: ' Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'
            },
            {
                type: 'link',
                content: 'jane.design/doctorcare'
            }
        ],
        publishedAt: new Date('2023-11-23 10:00:00')
    },
    {
        id: 2,
        author: {
            avatarUrl: 'https://github.com/carlosmascarenhas.png',
            name: 'Carlos Eduardo',
            role: 'CTO @Widea Software',
        },
        contents: [
            {
                type: 'paragraph',
                content: 'Fala galeraa 👋'
            },
            {
                type: 'paragraph',
                content: ' Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'
            },
            {
                type: 'link',
                content: 'jane.design/doctorcare'
            }
        ],
        publishedAt: new Date('2023-11-22 20:00:00')
    },
];

export function App() {
    return (
        <>
            <Header/>
            <div className={styles.wrapper}>
                <Sidebar/>
                <main>
                    {
                        posts.map(post => {
                            return (
                                <Post
                                    key={post.id}
                                    author={post.author}
                                    content={post.contents}
                                    publishedAt={post.publishedAt}
                                />
                            )
                        })
                    }
                </main>
            </div>
        </>
    )
}
