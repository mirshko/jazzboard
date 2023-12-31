import { CoMap, CoList, AccountMigration, Profile } from "cojson";

/** Walkthrough: Defining the data model with CoJSON
 *
 *  Here, we define our main data model of tasks, lists of tasks and projects
 *  using CoJSON's collaborative map and list types, CoMap & CoList.
 *
 *  CoMap values and CoLists items can contain:
 *  - arbitrary immutable JSON
 *  - references to other CoValues by their CoID
 **/

/** Bookmarks Types */

export type Tag = CoMap<{ text: string }>;

export type ListOfTags = CoList<Tag["id"]>;

export type Bookmark = CoMap<{
  url: string;
  title?: string;
  description?: string;
  read_later?: boolean;
  tags: ListOfTags["id"];
}>;

export type ListOfBookmarks = CoList<Bookmark["id"]>;

export type BookmarkGroup = CoMap<{
  title: string;
  bookmarks: ListOfBookmarks["id"];
}>;

export type ListOfBookmarkGroups = CoList<BookmarkGroup["id"]>

/** An individual task which collaborators can tick or rename */
export type Task = CoMap<{ done: boolean; text: string }>;

export type ListOfTasks = CoList<Task["id"]>;

/** Our top level object: a project with a title, referencing a list of tasks */
export type TodoProject = CoMap<{
  title: string;
  /** A collaborative, ordered list of tasks */
  tasks: ListOfTasks["id"];
}>;

export type ListOfProjects = CoList<TodoProject["id"]>;

/** The account root is an app-specific per-user private `CoMap`
 *  where you can store top-level objects for that user */
export type TodoAccountRoot = CoMap<{
  projects: ListOfProjects["id"];
  bookmarks: ListOfBookmarkGroups["id"];
}>;

/** The account migration is run on account creation and on every log-in.
 *  You can use it to set up the account root and any other initial CoValues you need.
 */
export const migration: AccountMigration<Profile, TodoAccountRoot> = (
  account
) => {
  if (!account.get("root")) {
    account.set(
      "root",
      account.createMap<TodoAccountRoot>({
        projects: account.createList<ListOfProjects>().id,
        bookmarks: account.createList<ListOfBookmarkGroups>().id,
      }).id
    );
  }
};
