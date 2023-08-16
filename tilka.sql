
create table users
(
    id         serial
        primary key,
    name       varchar(255)                                               not null,
    email      varchar(255)                                               not null
        unique,
    password   varchar(255)                                               not null,
    role       varchar(255)             default 'user'::character varying not null,
    created_at timestamp with time zone default now()                     not null,
    updated_at timestamp with time zone default now()                     not null
);

alter table users
    owner to tilka;

create table tokens
(
    id          serial
        primary key,
    token       varchar(255)                           not null
        unique,
    user_id     integer                                not null
        references users,
    type        varchar(255)                           not null,
    expires     timestamp with time zone               not null,
    blacklisted boolean                  default false,
    created_at  timestamp with time zone default now() not null,
    updated_at  timestamp with time zone default now() not null
);

alter table tokens
    owner to tilka;

create table authors
(
    id         serial
        primary key,
    first_name varchar(50)                            not null,
    last_name  varchar(50)                            not null,
    email      varchar(255)                           not null
        unique,
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);

alter table authors
    owner to tilka;

create table books
(
    id          serial
        primary key,
    title       varchar(255)                           not null,
    description varchar(250)                           not null,
    pages       integer,
    genre       varchar(255)                           not null,
    author_id   integer
        constraint books_authorid_fkey
            references authors,
    created_at  timestamp with time zone default now() not null,
    updated_at  timestamp with time zone default now() not null,
    isbn        varchar(13)                            not null
);

alter table books
    owner to tilka;

