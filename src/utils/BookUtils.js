import React from "react";

export class BookUtils {
    static getBookTitle(book) {
        if (book.titleInfo && !book.titleInfo.startsWith("[")) {
            return book.title + ". " + book.titleInfo.charAt(0).toUpperCase() + book.titleInfo.slice(1);
        } else {
            return book.title;
        }
    }

    static getAuthorFullName(person) {
        if (!person.surname) {
            return BookUtils.author(person);
        }

        let name = '';

        if (person.surname) {
            name += person.surname;
        }

        if (person.fullInitials) {
            name += " " + person.fullInitials;
        } else if (person.shortInitials) {
            name += " " + person.shortInitials;
        }

        if (person.alias) {
            name += " (" + person.alias + ")";
        }

        return name;
    }

    static author(person) {
        if (person.shortName) {
            let name = person.shortName;
            if (person.romanNumerals) {
                name += " " + person.romanNumerals;
            }
            return name;
        }

        if (person.shortInitials) {
            return `${person.surname} ${person.shortInitials}`
        }

        return person.surname;
    }

    static getAllAuthors(authors) {
        return authors.map((author) => {
            let person = author.person;
            return BookUtils.getAuthorFullName(person);
        }).join(", ");
    }

    static getSubjects(subjects) {
        return subjects.map((subject) => {
            return subject.title;
        }).join(", ");
    }

    static getPublishers(publishers) {
        return publishers.map((publisher) => {
            return publisher.title;
        }).join(", ");
    }

    static getSeries(series) {
        return series.join(", ");
    }

    static getPagesInfo(book) {
        return book.pagesInfo.pages + ' ' + (book.pagesInfo.pagesAbbreviation ? book.pagesInfo.pagesAbbreviation : '');
    }

    static getLanguages(book) {
        return book.languages.join(", ");
    }

    static getIsbnList(book) {
        return book.isbn.join(", ");
    }

    static getBookContentInfo(content) {
        let answer = '';
        let allAuthors = '';

        if (content.authors.length) {
            let firstAuthor = BookUtils.author(content.authors[0].person);

            if (firstAuthor) {
                answer = answer + firstAuthor.trim();
                if (!(firstAuthor.substring(firstAuthor.length - 1) === ".")) {
                    answer = answer + ".";
                }

                answer = answer + " ";
            }

            allAuthors = content.authors.map(a => BookUtils.author(a.person)).join(", ");
        }

        if (content.title) {
            answer = answer + content.title;
        }

        if (allAuthors) {
            answer = answer + " / " + allAuthors;
        }

        if (content.pages) {
            answer = answer + " — " + content.pages;
        }

        return answer;
    }

    static getCopiesDistricts(book, librariesMap) {
        const groupBy = function (list, keyGetter) {
            const map = new Map();
            list.forEach((item) => {
                const key = keyGetter(item);
                const collection = map.get(key);
                if (!collection) {
                    map.set(key, [item]);
                } else {
                    collection.push(item);
                }
            });
            return map;
        }

        let libraries = book.copies
            .filter(copy => copy)
            .map(copy => librariesMap.get(copy.librarySigla))
            .filter(library => library);

        let groupedDistricts = groupBy(libraries, library => library.address.district + ' район');

        const sortStringKeys = ([a], [b]) => String(a).localeCompare(b)
        return new Map([...groupedDistricts].sort(sortStringKeys));
    }

    static getCopyLibraryInfo(library) {
        if (library && library.address) {
            let address = library.address;

            if (address.street) {
                let answer = address.street;

                if (address.house) {
                    answer = answer + ", " + address.house;

                    if (address.building) {
                        answer = answer + "/" + address.building;
                    }
                }

                if (address.comment) {
                    answer = answer + " (" + address.comment + ")";
                }

                return answer;
            }

            return '';
        } else {
            return '';
        }
    }

    static getBookLabel(book) {
        let totalCount = book.copies.map((copy) => {
            return copy.totalCount
        }).reduce((a, b) => a + b, 0);
        let availableCount = book.copies.map((copy) => {
            return copy.availableCount
        }).reduce((a, b) => a + b, 0);

        return BookUtils.getCountLabel(totalCount, availableCount);
    }

    static getCopyLabel(copy) {
        return BookUtils.getCountLabel(copy.totalCount, copy.availableCount);
    }

    static getCountLabel(totalCount, availableCount) {
        let message = '';
        let labelStyle = 'secondary';

        if (totalCount > 0) {
            if (availableCount > 0) {
                labelStyle = (availableCount === 1) ? 'warning' : 'success';
            }

            if (totalCount === availableCount) {
                message = 'В наличии ' + availableCount + ' экз.';
            } else {
                message = 'В наличии ' + availableCount + ' из ' + totalCount + ' экз.';
            }
        } else {
            message = 'Нет в наличии';
        }

        return <span className={"badge badge-" + labelStyle}>{message}</span>;
    }
}