--------------------------------------------------------------------------------
{-# LANGUAGE OverloadedStrings #-}
import           Data.Monoid (mappend)
import           Hakyll


--------------------------------------------------------------------------------
main :: IO ()
main = hakyll $ do
    match "images/*" $ do
        route   idRoute
        compile copyFileCompiler

    match "css/index.css" $ do
        route   idRoute
        compile $ getResourceString
          >>= withItemBody (unixFilter "postcss" ["-c", "postcss.config.js", "--no-map"])
          >>= withItemBody (return . compressCss)

    match "js/*" $ do
      route idRoute
      compile copyFileCompiler

    match "templates/*" $ compile templateCompiler

    match "posts/*" $ do
        route $ setExtension "html"
        compile $ pandocCompiler
            >>= loadAndApplyTemplate "templates/post.html"    postCtx
            >>= loadAndApplyTemplate "templates/default.html" postCtx
            >>= relativizeUrls

    create ["blog.html"] $ do
        route idRoute
        compile $ do
            posts <- recentFirst =<< loadAll "posts/*"
            let archiveCtx =
                    listField "posts" postCtx (return posts) `mappend`
                    constField "title" "博客"            `mappend`
                    defaultContext

            makeItem ""
                >>= loadAndApplyTemplate "templates/archive.html" archiveCtx
                >>= loadAndApplyTemplate "templates/default.html" archiveCtx
                >>= relativizeUrls
    match "other/*" $ compile pandocCompiler
    create ["resume.html"] $ do
      route  idRoute
      compile $ do
        let ctx = constField "title" "简历" `mappend` postCtx
        loadBody "other/resume.md"
          >>= makeItem
          >>= loadAndApplyTemplate "templates/default.html" ctx

    create ["apps.html"] $ do
      route idRoute
      compile $ makeItem ""
        >>= loadAndApplyTemplate "templates/apps.html" defaultContext
        >>= loadAndApplyTemplate "templates/default.html" defaultContext
        >>= relativizeUrls

    create ["index.html"] $ do
        route idRoute
        compile $ do
          posts <- recentFirst =<< loadAll "posts/*"
          let indexCtx =
                listField "posts" postCtx (return posts) `mappend`
                constField "title" ""                `mappend`
                defaultContext

          makeItem ""
            >>= loadAndApplyTemplate "templates/home.html" indexCtx
            >>= relativizeUrls

    match ("static/*/*" .&&. fromRegex "(css|js|html)$") $ do
      route idRoute
      compile copyFileCompiler

--------------------------------------------------------------------------------
postCtx :: Context String
postCtx =
    dateField "date" "%B %e, %Y" `mappend`
    defaultContext

