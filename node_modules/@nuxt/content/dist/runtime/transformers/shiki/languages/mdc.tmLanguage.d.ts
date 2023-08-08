declare const grammar: {
    information_for_contributors: string[];
    version: string;
    name: string;
    injectionSelector: string;
    scopeName: string;
    patterns: {
        include: string;
    }[];
    repository: {
        block: {
            comment: string;
            patterns: {
                include: string;
            }[];
        };
        inline: {
            patterns: {
                include: string;
            }[];
        };
        markdown_attributes: {
            match: string;
            name: string;
            captures: {
                "4": {
                    patterns: {
                        include: string;
                    }[];
                };
            };
        };
        span: {
            match: string;
            name: string;
            captures: {
                "2": {
                    name: string;
                };
                "4": {
                    patterns: {
                        include: string;
                    }[];
                };
            };
        };
        attributes: {
            match: string;
            name: string;
            captures: {
                "3": {
                    patterns: {
                        include: string;
                    }[];
                };
            };
        };
        component_inline: {
            match: string;
            name: string;
            captures: {
                "2": {
                    name: string;
                };
                "3": {
                    name: string;
                };
                "5": {
                    patterns: {
                        include: string;
                    }[];
                };
                "6": {
                    patterns: {
                        include: string;
                    }[];
                };
                "7": {
                    patterns: {
                        include: string;
                    }[];
                };
                "8": {
                    patterns: {
                        include: string;
                    }[];
                };
            };
        };
        component_block: {
            begin: string;
            name: string;
            end: string;
            beginCaptures: {
                "4": {
                    name: string;
                };
                "5": {
                    patterns: {
                        include: string;
                    }[];
                };
            };
            patterns: {
                include: string;
            }[];
        };
        content: {
            begin: string;
            while: string;
            contentName: string;
            patterns: ({
                begin: string;
                end: string;
                patterns: {
                    include: string;
                }[];
                match?: undefined;
                captures?: undefined;
                comment?: undefined;
                include?: undefined;
            } | {
                match: string;
                captures: {
                    "2": {
                        name: string;
                    };
                    "3": {
                        name: string;
                    };
                };
                begin?: undefined;
                end?: undefined;
                patterns?: undefined;
                comment?: undefined;
                include?: undefined;
            } | {
                comment: string;
                include: string;
                begin?: undefined;
                end?: undefined;
                patterns?: undefined;
                match?: undefined;
                captures?: undefined;
            })[];
        };
        attribute: {
            patterns: {
                match: string;
                captures: {
                    "2": {
                        name: string;
                    };
                    "3": {
                        patterns: {
                            include: string;
                        }[];
                    };
                };
            }[];
        };
        "attribute-interior": {
            comment: string;
            patterns: {
                begin: string;
                beginCaptures: {
                    "0": {
                        name: string;
                    };
                };
                end: string;
                patterns: ({
                    match: string;
                    name: string;
                    begin?: undefined;
                    beginCaptures?: undefined;
                    end?: undefined;
                    endCaptures?: undefined;
                    patterns?: undefined;
                } | {
                    begin: string;
                    beginCaptures: {
                        "0": {
                            name: string;
                        };
                    };
                    end: string;
                    endCaptures: {
                        "0": {
                            name: string;
                        };
                    };
                    name: string;
                    patterns: {
                        include: string;
                    }[];
                    match?: undefined;
                })[];
            }[];
        };
        entities: {
            comment: string;
            patterns: ({
                captures: {
                    "1": {
                        name: string;
                    };
                    "912": {
                        name: string;
                    };
                    "3"?: undefined;
                };
                comment: string;
                match: string;
                name: string;
            } | {
                captures: {
                    "1": {
                        name: string;
                    };
                    "3": {
                        name: string;
                    };
                    "912"?: undefined;
                };
                match: string;
                name: string;
                comment?: undefined;
            } | {
                match: string;
                name: string;
                captures?: undefined;
                comment?: undefined;
            })[];
        };
        heading: {
            match: string;
            captures: {
                "1": {
                    patterns: {
                        match: string;
                        name: string;
                        captures: {
                            "1": {
                                name: string;
                            };
                            "2": {
                                name: string;
                                patterns: {
                                    include: string;
                                }[];
                            };
                            "3": {
                                name: string;
                            };
                        };
                    }[];
                };
            };
            name: string;
            patterns: {
                include: string;
            }[];
        };
        "heading-setext": {
            patterns: {
                match: string;
                name: string;
            }[];
        };
        lists: {
            patterns: ({
                begin: string;
                beginCaptures: {
                    "3": {
                        name: string;
                    };
                };
                comment: string;
                name: string;
                patterns: {
                    include: string;
                }[];
                while: string;
            } | {
                begin: string;
                beginCaptures: {
                    "3": {
                        name: string;
                    };
                };
                name: string;
                patterns: {
                    include: string;
                }[];
                while: string;
                comment?: undefined;
            })[];
        };
        paragraph: {
            begin: string;
            name: string;
            patterns: {
                include: string;
            }[];
            while: string;
        };
        blockquote: {
            begin: string;
            captures: {
                "2": {
                    name: string;
                };
            };
            name: string;
            patterns: {
                include: string;
            }[];
            while: string;
        };
    };
};
export default grammar;
