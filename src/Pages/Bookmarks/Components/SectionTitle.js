export default function SectionTitle({ title, hideFolderContents }) {
    return (
        <h2 onClick={ hideFolderContents(title.replace(' ', '-') + '-list-section') }>
            { title }
        </h2>
    )
}