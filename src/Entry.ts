const NEXT_ID_KEY = "nextEntryID";
const ENTRIES_KEY = "entries";

type RawEntry = {
    id: number;
    title: string;
    text: string;
    date: string;
    isFavorite: boolean;
    keywords: string[];
}

class Entry {
    id: number;
    title: string;
    text: string;
    date: Date;
    isFavorite: boolean;
    keywords: string[];

    constructor (title: string, text: string, date: Date, keywords: string[], id:number=Entry.getNextEntryId()) {
        this.id =id;
        this.title = title;
        this.text = text;
        this.date = date;
        this.isFavorite = false;
        this.keywords = keywords;
    }

    // Method to turn any JSON Object into an entry object
    static fromJSON(object: RawEntry): Entry {
        const entry = new Entry(object.title, object.text, new Date(object.date), object.keywords, object.id);
        entry.isFavorite = object.isFavorite;
        return entry;
    }

    // Method to retrieve and increment the next entry id
    static getNextEntryId(): number {  
    // Get the nextID from localStorage and set to zero if it doesnt exist
    const nextID: number = parseInt(localStorage.getItem(NEXT_ID_KEY) || "0", 10);
    // Write the incremented nextID to localStorage
    localStorage.setItem(NEXT_ID_KEY, (nextID + 1).toString());
    return nextID;
    }

    // Create new entry with specified values
    static createEntry(title: string, text: string, date: Date, keywords: string[]): Entry {
        const newEntry: Entry = new Entry(title, text, date, keywords);
        let newEntriesList: Entry[] = Entry.getEntries();
        newEntriesList.push(newEntry);
        localStorage.setItem(ENTRIES_KEY, JSON.stringify(newEntriesList));
        return newEntry;
    }

    // Get all Entries from the storage
    static getEntries(): Entry[] {
        const rawEntries: string = localStorage.getItem(ENTRIES_KEY) || "[]";
        const parsedEntries: RawEntry[] = JSON.parse(rawEntries);
        
        let entriesList: Entry[] = [];
        for (const entry of parsedEntries) {
            entriesList.push(Entry.fromJSON(entry));
        }
        return entriesList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    // Get entry by id
    static getEntry(id: number): Entry {
        const allEntries: Entry[] = Entry.getEntries();
        const entry = allEntries.find(entry => entry.id == id);
        if (!entry) {
            throw new Error(`No entry found with id ${id}`);
        }
        return entry;
    }

    // Clear all entries from the storage
    static clearEntries(): void {
        localStorage.setItem(ENTRIES_KEY, "[]");
        localStorage.setItem(NEXT_ID_KEY, "0");
    }

    // Method to update one or multiple values of an Entry
    // Uses object as input and Partial<{...}> as type to declare that not all parameters are required
    update({id=this.id, title=this.title, text=this.text, date=this.date, isFavorite=this.isFavorite, keywords=this.keywords}: Partial<{id:number, title:string, text: string, date: Date, isFavorite: boolean, keywords:string[]}>): boolean {
        this.id = id;
        this.title = title;
        this.text = text;
        this.date = date;
        this.keywords = keywords;
        this.isFavorite = isFavorite;
        let newEntries: Entry[] = Entry.getEntries();
        const entryIndex = newEntries.findIndex(entry => entry.id == id);
        newEntries[entryIndex] = this;
        localStorage.setItem(ENTRIES_KEY, JSON.stringify(newEntries));
        return true;
    }

    // Delete object from storage
    delete(): boolean {
        let newEntries: Entry[] = Entry.getEntries();
        const entryIndex = newEntries.findIndex(entry => entry.id == this.id);
        newEntries.splice(entryIndex, 1);
        localStorage.setItem(ENTRIES_KEY, JSON.stringify(newEntries));
        return true;
    }

    // Toggle the isFavorite value of the entry
    toggleFavorite(): boolean {
        let newEntries: Entry[] = Entry.getEntries();
        const entryIndex = newEntries.findIndex(entry => entry.id == this.id);
        newEntries[entryIndex].isFavorite = !newEntries[entryIndex].isFavorite;
        localStorage.setItem(ENTRIES_KEY, JSON.stringify(newEntries));
        return true;
    }


    // Get all unique keywords used in the entries
    static getAllKeywords(): string[] {
        let allEntries = this.getEntries();
        let keywords: string[] = [];
        for (let entry of allEntries) {
            for (let keyword of entry.keywords) {
                if (!keywords.includes(keyword)) {
                    keywords.push(keyword);
                }
            }
        }
        return keywords;
    }
}

interface EntryProps {
    entry: Entry;
}

export default Entry;
export type {EntryProps}