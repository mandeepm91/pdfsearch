PUT /feeds
{
    "index" : {
        "analysis": {
            "analyzer": {
                "edgengram_analyzer": {
                    "filter": ["edgengram"],
                    "tokenizer": "lowercase",
                    "type": "custom"
                },
                "ngram_analyzer": {
                    "filter": ["ngram"],
                    "tokenizer": "lowercase",
                    "type": "custom"
                }
            },
            "filter": {
                "edgengram": {
                    "max_gram": "15",
                    "min_gram": "2",
                    "type": "edgeNGram"
                },
                "ngram": {
                    "max_gram": "15",
                    "min_gram": "3",
                    "type": "nGram"
                }
            },
            "tokenizer": {
                "edgengram_tokenizer": {
                    "max_gram": "15",
                    "min_gram": "2",
                    "side": "front",
                    "type": "edgeNGram"
                },
                "ngram_tokenizer": {
                    "max_gram": "15",
                    "min_gram": "3",
                    "type": "nGram"
                }
            }
        }
    }
}


PUT /feeds/_mapping/feeds
{
    "properties": {
        "address": {
            "analyzer": "edgengram_analyzer",
            "store": true,
            "term_vector": "with_positions_offsets",
            "type": "string"
        },
        "feed_id": {
            "store": true,
            "type": "string"
        },
        "num_subscribers": {
            "index": "analyzed",
            "store": true,
            "type": "long"
        },
        "title": {
            "analyzer": "edgengram_analyzer",
            "store": true,
            "term_vector": "with_positions_offsets",
            "type": "string"
        }        
    }
}