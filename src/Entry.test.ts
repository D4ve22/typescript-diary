import Entry from "./Entry";

describe("Entry class", () => {
    let localStorageMock: Storage;
    
    beforeEach(() => {

        // Mocks the localStorage to be used by the Entry class
        let storage: Record<string, string> = {};
        localStorageMock = {
            getItem: jest.fn((key) => storage[key] || null),
            setItem: jest.fn((key, value) => {
                storage[key] = value;
            }),
            clear: jest.fn(() => {
                storage = {};

            }),
            removeItem: jest.fn((key) => {
                delete storage[key];
            }), 
            key: jest.fn(),length: 0,
        };

        Object.defineProperty(window, "localStorage", {
            value: localStorageMock,
        });

        localStorage.clear(); // Reset before each test
    });


    /* Tests the mandatory feature 1:
    - Entries are sorted by date (with newest entries first)
    - Entries have the required attributes for the display (title, creation-date, text and keywords)
    */
    test("mandatory feature 1 - entries are sorted by date (newest first) and have required attributes", () => {
        const oldDate = new Date("2023-01-01");
        const midDate = new Date("2024-06-01");
        const newDate = new Date("2025-01-01");
        
        Entry.createEntry("Old Entry", "This is the oldest entry.", oldDate, []);
        Entry.createEntry("Mid Entry", "This is entry is in the middle.", midDate, []);
        Entry.createEntry("New Entry", "This is the newest entry.", newDate, []);
        
        const entries = Entry.getEntries();
        
        expect(entries[0].title).toBe("New Entry");
        expect(entries[1].title).toBe("Mid Entry");
        expect(entries[2].title).toBe("Old Entry");

        for (const entry of entries) {
            expect(entry.hasOwnProperty("title")).toBe(true);
            expect(entry.hasOwnProperty("text")).toBe(true);
            expect(entry.hasOwnProperty("date")).toBe(true);
            expect(entry.hasOwnProperty("keywords")).toBe(true);
        }
    });


    /* Tests the mandatory feature 3:
        - Entries have a property to be marked as isFavorite
        - Entries can be marked / unmarked as favorite by toggeling the marking
    */
   test("mandatory feature 3 - entries can be marked as favorites", () => {
    const date1 = new Date("2025-01-01");
    const date2 = new Date("2025-01-02");
    Entry.createEntry("Test entry 1", "This is the description of test entry 1", date1, ["kw1", "kw2"]);
    Entry.createEntry("Test entry 2", "This is the description of test entry 2", date2, ["kw3", "kw4"]);

    let entries = Entry.getEntries();

    for (const entry of entries) {
        expect(entry.hasOwnProperty("isFavorite")).toBe(true);
    }

    expect(entries[0].isFavorite).toBe(false);
    expect(entries[1].isFavorite).toBe(false);

    entries[0].toggleFavorite();
    entries = Entry.getEntries();

    expect(entries[0].isFavorite).toBe(true);
    expect(entries[1].isFavorite).toBe(false);

    entries[0].toggleFavorite();
    entries = Entry.getEntries();

    expect(entries[0].isFavorite).toBe(false);
    expect(entries[1].isFavorite).toBe(false);
   });


    /* Tests the optional feature 1:
        - Entries are saved persistently in the localStorage
        - Entries can be retrieved from the localStorage
    */
   test("optional feature 1 - entries are saved persistently in the localStorage and can be retrieved from there", () => {
    expect(localStorage.getItem("entries")).toBe(null);
    const date1 = new Date("2025-01-01");
    const date2 = new Date("2025-01-02");
    Entry.createEntry("Test entry 1", "This is the description of test entry 1", date1, ["kw1", "kw2"]);
    Entry.createEntry("Test entry 2", "This is the description of test entry 2", date2, ["kw3", "kw4"]);

    expect(localStorage.getItem("entries")).toBe(`[{"id":0,"title":"Test entry 1","text":"This is the description of test entry 1","date":"${date1.toISOString()}","isFavorite":false,"keywords":["kw1","kw2"]},{"id":1,"title":"Test entry 2","text":"This is the description of test entry 2","date":"${date2.toISOString()}","isFavorite":false,"keywords":["kw3","kw4"]}]`);
    
    const retrievedEntries = Entry.getEntries();
    
    expect(retrievedEntries.length).toBe(2);
    expect(retrievedEntries[0].title).toBe("Test entry 2");
    expect(JSON.stringify(retrievedEntries[1].keywords)).toBe('["kw1","kw2"]');
    });

});