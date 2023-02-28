export class QueryBlogDto {
    readonly pageNumber: string;
    readonly pageSize: string;
    readonly sortBy: string;
    readonly sortDirection: "desc" | "asc" ;
    readonly searchNameTerm?: string;
}

export class QueryUserDto extends QueryBlogDto {
    readonly banStatus: "all" | "banned" | "notBanned";
    readonly searchLoginTerm?: string;
    readonly searchEmailTerm?: string;
}

export class QueryAnswersDto extends QueryBlogDto {
    readonly publishedStatus: "all" | "published" | "notPublished";
    readonly bodySearchTerm?: string;
}