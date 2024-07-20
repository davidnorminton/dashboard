export default function  FolderTitle ({ title, hideFolderContents }) {
    
    function hideFolderContents(folder) {
        const contents = document.getElementsByClassName(folder);
        if (contents.length > 0) {
            if (contents[0].classList.contains('hide')) {
                contents[0].classList.remove('hide')
            } else {
                contents[0].classList.add('hide')
            }
        }
    }

    return (
    <h3 onClick={ () => hideFolderContents(title.replace(' ', '-') + '_' + title.replace(' ', '-') + '-list') }>
        <i class="fa-regular fa-folder bookmark-folder-icon"></i>
        <span>{ title }</span>
    </h3>
    )
}