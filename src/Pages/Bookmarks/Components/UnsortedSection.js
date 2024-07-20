import BookmarkItem from './BookmarkItem';
import FolderTitle from './FolderTitle';

export default function UnsortedSection({ sections, hideFolderContents }) {
    return (
        <div>
        {
            (sections.unsorted.length > 0) ? (
                <div className={ hideFolderContents(sections.title.replace(' ', '-') + '-list-section') }>

                    <FolderTitle 
                        title="unsorted" 
                        hideFolderContents={ hideFolderContents }
                    />

                    <ul className={ sections.title.replace(' ', '-') + '-unsorted-list bookmarks-list'}>
                        {
                            sections.unsorted.map((folder) => (<BookmarkItem folder={ folder } />))
                        }
                    </ul>
                </div>

            ) : ('')
        }        
        </div>
    )
}