"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import SidebarNav from "@/app/components/SidebarNav";
import PaginationControls from "@/app/components/PaginationControls";
import { Breadcrumb, Header } from "@/app/components/TopBar";
import AuthorForm from "@/app/components/forms/AuthorForm";
import BookForm from "@/app/components/forms/BookForm";
import ReviewForm from "@/app/components/forms/ReviewForm";
import DeleteConfirmModal from "@/app/components/modals/DeleteConfirmModal";
import EditAuthorModal from "@/app/components/modals/EditAuthorModal";
import EditBookModal from "@/app/components/modals/EditBookModal";
import EditReviewModal from "@/app/components/modals/EditReviewModal";
import AuthorsTable, { type AuthorRow } from "@/app/components/tables/AuthorsTable";
import BooksTable, { type BookRow } from "@/app/components/tables/BooksTable";
import ReviewsTable, { type ReviewRow } from "@/app/components/tables/ReviewsTable";
import EmptyState from "@/app/components/ui/EmptyState";
import LoadingTableSkeleton from "@/app/components/ui/LoadingTableSkeleton";
import { type SectionKey } from "@/app/lib/api";
import {
  createAuthor,
  createBook,
  createReview,
  deleteAuthor,
  deleteBook,
  deleteReview,
  getAuthorOptions,
  getBookOptions,
  listAuthors,
  listBooks,
  listReviews,
  type BookSelectOption,
  type SelectOption,
  updateAuthor,
  updateBook,
  updateReview
} from "@/app/services";

type AppMode = "list" | "create";

type PagingState<T> = {
  page: number;
  totalPages: number;
  total: number;
  data: T[];
};

type DeleteModalState = {
  open: boolean;
  section: SectionKey;
  id: string;
  label: string;
};

type EditModalState = {
  open: boolean;
  id: string;
  name: string;
};

type EditBookModalState = {
  open: boolean;
  id: string;
  title: string;
  authorId: string;
};

type EditReviewModalState = {
  open: boolean;
  id: string;
  content: string;
  bookId: string;
};

const initialPaging = <T,>(): PagingState<T> => ({
  page: 1,
  totalPages: 1,
  total: 0,
  data: []
});

export default function HomePage() {
  const [section, setSection] = useState<SectionKey>("authors");
  const [mode, setMode] = useState<AppMode>("list");
  const [expanded, setExpanded] = useState<Record<SectionKey, boolean>>({
    authors: true,
    books: true,
    reviews: true
  });

  const [authorsPaging, setAuthorsPaging] = useState<PagingState<AuthorRow>>(initialPaging);
  const [booksPaging, setBooksPaging] = useState<PagingState<BookRow>>(initialPaging);
  const [reviewsPaging, setReviewsPaging] = useState<PagingState<ReviewRow>>(initialPaging);

  const [authorsPage, setAuthorsPage] = useState(1);
  const [booksPage, setBooksPage] = useState(1);
  const [reviewsPage, setReviewsPage] = useState(1);

  const [authorName, setAuthorName] = useState("");
  const [authorError, setAuthorError] = useState("");

  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthorId, setBookAuthorId] = useState("");

  const [reviewContent, setReviewContent] = useState("");
  const [reviewBookId, setReviewBookId] = useState("");

  const [authorOptions, setAuthorOptions] = useState<SelectOption[]>([]);
  const [bookOptions, setBookOptions] = useState<BookSelectOption[]>([]);

  const [globalError, setGlobalError] = useState("");
  const [loading, setLoading] = useState(false);

  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
    open: false,
    section: "authors",
    id: "",
    label: ""
  });

  const [editModal, setEditModal] = useState<EditModalState>({
    open: false,
    id: "",
    name: ""
  });

  const [editBookModal, setEditBookModal] = useState<EditBookModalState>({
    open: false,
    id: "",
    title: "",
    authorId: ""
  });

  const [editReviewModal, setEditReviewModal] = useState<EditReviewModalState>({
    open: false,
    id: "",
    content: "",
    bookId: ""
  });

  const activePage = useMemo(() => {
    if (section === "authors") return authorsPage;
    if (section === "books") return booksPage;
    return reviewsPage;
  }, [section, authorsPage, booksPage, reviewsPage]);

  const activePaging = useMemo(() => {
    if (section === "authors") return authorsPaging;
    if (section === "books") return booksPaging;
    return reviewsPaging;
  }, [section, authorsPaging, booksPaging, reviewsPaging]);

  const setPageForSection = useCallback(
    (nextPage: number) => {
      if (section === "authors") setAuthorsPage(nextPage);
      else if (section === "books") setBooksPage(nextPage);
      else setReviewsPage(nextPage);
    },
    [section]
  );

  const loadList = useCallback(async () => {
    setLoading(true);
    setGlobalError("");

    try {
      const page = section === "authors" ? authorsPage : section === "books" ? booksPage : reviewsPage;
      const response =
        section === "authors"
          ? await listAuthors(page)
          : section === "books"
          ? await listBooks(page)
          : await listReviews(page);

      const normalized = {
        page: response.page,
        totalPages: response.totalPages || 1,
        total: response.total || 0,
        data: response.data || []
      };

      if (section === "authors") setAuthorsPaging(normalized as PagingState<AuthorRow>);
      if (section === "books") setBooksPaging(normalized as PagingState<BookRow>);
      if (section === "reviews") setReviewsPaging(normalized as PagingState<ReviewRow>);
    } catch (error) {
      setGlobalError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [section, authorsPage, booksPage, reviewsPage]);

  const loadOptions = useCallback(async () => {
    try {
      const [authors, books] = await Promise.all([
        getAuthorOptions(),
        getBookOptions()
      ]);

      setAuthorOptions(authors || []);
      setBookOptions(books || []);
    } catch (error) {
      setGlobalError(error instanceof Error ? error.message : "Unknown error");
    }
  }, []);

  useEffect(() => {
    if (mode === "list") {
      void loadList();
    }
  }, [mode, loadList]);

  useEffect(() => {
    if (mode === "create" && (section === "books" || section === "reviews")) {
      void loadOptions();
    }
  }, [mode, section, loadOptions]);

  const handleSelect = (nextSection: SectionKey, nextMode: AppMode) => {
    setSection(nextSection);
    setMode(nextMode);
    setGlobalError("");
  };

  const handleDelete = async () => {
    try {
      if (deleteModal.section === "authors") {
        await deleteAuthor(deleteModal.id);
      } else if (deleteModal.section === "books") {
        await deleteBook(deleteModal.id);
      } else {
        await deleteReview(deleteModal.id);
      }
      setDeleteModal({ open: false, section: "authors", id: "", label: "" });
      setMode("list");
      void loadList();
    } catch (error) {
      setGlobalError(error instanceof Error ? error.message : "Unknown error");
    }
  };

  const submitAuthorCreate = async () => {
    setAuthorError("");
    const trimmed = authorName.trim();

    if (!trimmed) {
      setAuthorError("Please enter name");
      return;
    }

    try {
      await createAuthor(trimmed);
      setAuthorName("");
      setSection("authors");
      setMode("list");
      setAuthorsPage(1);
      void loadList();
    } catch (error) {
      setGlobalError(error instanceof Error ? error.message : "Unknown error");
    }
  };

  const submitBookCreate = async () => {
    const title = bookTitle.trim();
    if (!title || !bookAuthorId) {
      setGlobalError("Please provide title and author.");
      return;
    }

    try {
      await createBook(title, bookAuthorId);
      setBookTitle("");
      setBookAuthorId("");
      setSection("books");
      setMode("list");
      setBooksPage(1);
      void loadList();
    } catch (error) {
      setGlobalError(error instanceof Error ? error.message : "Unknown error");
    }
  };

  const submitReviewCreate = async () => {
    const content = reviewContent.trim();
    if (!content || !reviewBookId) {
      setGlobalError("Please provide review and book.");
      return;
    }

    try {
      await createReview(content, reviewBookId);
      setReviewContent("");
      setReviewBookId("");
      setSection("reviews");
      setMode("list");
      setReviewsPage(1);
      void loadList();
    } catch (error) {
      setGlobalError(error instanceof Error ? error.message : "Unknown error");
    }
  };

  const submitEditAuthor = async () => {
    const trimmed = editModal.name.trim();
    if (!trimmed) return;

    try {
      await updateAuthor(editModal.id, trimmed);
      setEditModal({ open: false, id: "", name: "" });
      void loadList();
    } catch (error) {
      setGlobalError(error instanceof Error ? error.message : "Unknown error");
    }
  };

  const submitEditBook = async () => {
    const title = editBookModal.title.trim();
    if (!title || !editBookModal.authorId) {
      setGlobalError("Please provide title and author.");
      return;
    }

    try {
      await updateBook(editBookModal.id, title, editBookModal.authorId);
      setEditBookModal({ open: false, id: "", title: "", authorId: "" });
      void loadList();
    } catch (error) {
      setGlobalError(error instanceof Error ? error.message : "Unknown error");
    }
  };

  const submitEditReview = async () => {
    const content = editReviewModal.content.trim();
    if (!content || !editReviewModal.bookId) {
      setGlobalError("Please provide review and book.");
      return;
    }

    try {
      await updateReview(editReviewModal.id, content, editReviewModal.bookId);
      setEditReviewModal({ open: false, id: "", content: "", bookId: "" });
      void loadList();
    } catch (error) {
      setGlobalError(error instanceof Error ? error.message : "Unknown error");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_12%_12%,#dbeafe,transparent_45%),radial-gradient(circle_at_90%_12%,#cffafe,transparent_35%),linear-gradient(180deg,#f8fafc,#eef6ff)] text-slate-800">
      <Header />
      <Breadcrumb section={section} mode={mode} />

      <div className="grid min-h-[calc(100vh-132px)] grid-cols-1 lg:grid-cols-[320px_1fr]">
        <SidebarNav
          section={section}
          mode={mode}
          expanded={expanded}
          onToggle={(key) => setExpanded((prev) => ({ ...prev, [key]: !prev[key] }))}
          onSelect={handleSelect}
        />

        <main className="p-5 sm:p-8">
          <div className="mb-5 h-px bg-linear-to-r from-sky-500/80 via-transparent to-slate-300" />

          {globalError ? (
            <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
              {globalError}
            </div>
          ) : null}

          {mode === "list" ? (
            <>
              {loading ? <LoadingTableSkeleton /> : null}

              {!loading && section === "authors" ? (
                (activePaging.data.length > 0 ? (
                  <AuthorsTable
                    rows={activePaging.data as AuthorRow[]}
                    page={activePage}
                    onEdit={(author) => setEditModal({ open: true, id: author.id, name: author.name })}
                    onDelete={(id, label) => setDeleteModal({ open: true, section: "authors", id, label })}
                  />
                ) : (
                  <EmptyState title="No authors yet" description="Create your first author to start managing books." />
                ))
              ) : null}

              {!loading && section === "books" ? (
                (activePaging.data.length > 0 ? (
                  <BooksTable
                    rows={activePaging.data as BookRow[]}
                    page={activePage}
                    onEdit={(book) => {
                      void loadOptions();
                      setEditBookModal({
                        open: true,
                        id: book.id,
                        title: book.title,
                        authorId: book.authorId
                      });
                    }}
                    onDelete={(id, label) => setDeleteModal({ open: true, section: "books", id, label })}
                  />
                ) : (
                  <EmptyState title="No books yet" description="Create a book and connect it with an author." />
                ))
              ) : null}

              {!loading && section === "reviews" ? (
                (activePaging.data.length > 0 ? (
                  <ReviewsTable
                    rows={activePaging.data as ReviewRow[]}
                    page={activePage}
                    onEdit={(review) => {
                      void loadOptions();
                      setEditReviewModal({
                        open: true,
                        id: review.id,
                        content: review.content,
                        bookId: review.bookId
                      });
                    }}
                    onDelete={(id, label) => setDeleteModal({ open: true, section: "reviews", id, label })}
                  />
                ) : (
                  <EmptyState title="No reviews yet" description="Create a review after selecting a book." />
                ))
              ) : null}

              <PaginationControls page={activePage} totalPages={activePaging.totalPages} onChange={setPageForSection} />
            </>
          ) : null}

          {mode === "create" && section === "authors" ? (
            <AuthorForm
              value={authorName}
              error={authorError}
              onChange={(value) => {
                setAuthorName(value);
                if (authorError) setAuthorError("");
              }}
              onSubmit={submitAuthorCreate}
            />
          ) : null}

          {mode === "create" && section === "books" ? (
            <BookForm
              title={bookTitle}
              authorId={bookAuthorId}
              authorOptions={authorOptions}
              onTitleChange={setBookTitle}
              onAuthorChange={setBookAuthorId}
              onSubmit={submitBookCreate}
            />
          ) : null}

          {mode === "create" && section === "reviews" ? (
            <ReviewForm
              content={reviewContent}
              bookId={reviewBookId}
              bookOptions={bookOptions}
              onContentChange={setReviewContent}
              onBookChange={setReviewBookId}
              onSubmit={submitReviewCreate}
            />
          ) : null}
        </main>
      </div>

      <DeleteConfirmModal
        open={deleteModal.open}
        label={deleteModal.label}
        onCancel={() => setDeleteModal({ open: false, section: "authors", id: "", label: "" })}
        onConfirm={handleDelete}
      />

      <EditAuthorModal
        open={editModal.open}
        value={editModal.name}
        onChange={(name) => setEditModal((prev) => ({ ...prev, name }))}
        onCancel={() => setEditModal({ open: false, id: "", name: "" })}
        onSave={submitEditAuthor}
      />

      <EditBookModal
        open={editBookModal.open}
        title={editBookModal.title}
        authorId={editBookModal.authorId}
        authorOptions={authorOptions}
        onTitleChange={(title) => setEditBookModal((prev) => ({ ...prev, title }))}
        onAuthorChange={(authorId) => setEditBookModal((prev) => ({ ...prev, authorId }))}
        onCancel={() => setEditBookModal({ open: false, id: "", title: "", authorId: "" })}
        onSave={submitEditBook}
      />

      <EditReviewModal
        open={editReviewModal.open}
        content={editReviewModal.content}
        bookId={editReviewModal.bookId}
        bookOptions={bookOptions}
        onContentChange={(content) => setEditReviewModal((prev) => ({ ...prev, content }))}
        onBookChange={(bookId) => setEditReviewModal((prev) => ({ ...prev, bookId }))}
        onCancel={() => setEditReviewModal({ open: false, id: "", content: "", bookId: "" })}
        onSave={submitEditReview}
      />
    </div>
  );
}
